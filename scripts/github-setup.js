import { Octokit } from '@octokit/rest';

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function createRepository() {
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get user info
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}`);

    // Create repository
    const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
      name: 'stellarank',
      description: 'StellaRank - Stellar Contributor Reputation Platform',
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: false,
      auto_init: false
    });

    console.log(`✅ Repository created successfully!`);
    console.log(`📁 Repository URL: ${repo.html_url}`);
    console.log(`🔗 Clone URL: ${repo.clone_url}`);
    console.log(`🔗 SSH URL: ${repo.ssh_url}`);
    
    console.log(`\n📝 Next steps:`);
    console.log(`1. Run these commands in the shell:`);
    console.log(`   git add .`);
    console.log(`   git commit -m "Initial commit: StellaRank application"`);
    console.log(`   git branch -M main`);
    console.log(`   git remote add origin ${repo.clone_url}`);
    console.log(`   git push -u origin main`);

    return repo;
  } catch (error) {
    if (error.status === 422 && error.message.includes('already exists')) {
      console.log('⚠️ Repository "stellarank" already exists in your GitHub account');
      
      // Get existing repository info
      const octokit = await getUncachableGitHubClient();
      const { data: user } = await octokit.rest.users.getAuthenticated();
      const { data: repo } = await octokit.rest.repos.get({
        owner: user.login,
        repo: 'stellarank'
      });
      
      console.log(`📁 Existing Repository URL: ${repo.html_url}`);
      console.log(`🔗 Clone URL: ${repo.clone_url}`);
      
      console.log(`\n📝 To push to existing repository:`);
      console.log(`   git add .`);
      console.log(`   git commit -m "Update: StellaRank application"`);
      console.log(`   git remote add origin ${repo.clone_url} (if not already added)`);
      console.log(`   git push -u origin main`);
      
      return repo;
    } else {
      console.error('Error creating repository:', error.message);
      throw error;
    }
  }
}

// Run the script
createRepository()
  .then(() => {
    console.log('\n🎉 GitHub setup complete!');
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  });