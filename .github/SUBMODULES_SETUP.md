# Private Submodules Configuration Guide

## Overview
This guide explains how to configure GitHub Actions to work with private Git submodules using a Personal Access Token (PAT).

## Required Setup

### 1. Create Personal Access Token (PAT)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Set the following scopes:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership, read org projects)
4. Set an appropriate expiration date
5. Copy the generated token (you won't see it again!)

### 2. Add Token to Repository Secrets

1. Go to your main repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `SUBMODULES_PAT`
4. Value: Paste the PAT token you created
5. Click "Add secret"

### 3. Verify Submodules Configuration

Ensure your `.gitmodules` file contains the correct URLs for private repositories:

```ini
[submodule "MCP_servers/ASimpleStargGazer_python"]
    path = MCP_servers/ASimpleStargGazer_python
    url = https://github.com/Ruixiaoke/ASimpleStargGazer_python.git

[submodule "MCP_servers/ASimpleStargGazer_dotnet"]
    path = MCP_servers/ASimpleStargGazer_dotnet
    url = https://github.com/Ruixiaoke/ASimpleStargGazer_dotnet.git

[submodule "MCP_servers/ASimpleStargGazer_node"]
    path = MCP_servers/ASimpleStargGazer_node
    url = https://github.com/Ruixiaoke/ASimpleStargGazer_node.git

[submodule "ASimpleStargGazer_frontend"]
    path = ASimpleStargGazer_frontend
    url = https://github.com/Ruixiaoke/ASimpleStargGazer_frontend.git

[submodule "ASimpleStargGazer_Infra"]
    path = ASimpleStargGazer_Infra
    url = https://github.com/Ruixiaoke/ASimpleStargGazer_Infra.git
```

## Updated Workflows

The following workflows have been updated to use the `SUBMODULES_PAT` token:

### ✅ CI/CD Pipeline (`.github/workflows/ci.yml`)
- All jobs that need submodule access now use the PAT token
- Ensures private submodules are properly cloned during CI

### ✅ Deployment Pipeline (`.github/workflows/deploy.yml`)
- Docker image building with private submodule access
- Deployment steps with full submodule synchronization

### ✅ Pull Request Workflow (`.github/workflows/pr.yml`)
- Code quality checks across all private submodules
- Test coverage reporting from all components

### ✅ Maintenance Workflow (`.github/workflows/maintenance.yml`)
- Dependency updates for private submodules
- Security scanning across all repositories
- Project metrics generation

## Workflow Usage Pattern

All updated workflows now use this pattern for checkout:

```yaml
- uses: actions/checkout@v4
  with:
    submodules: recursive
    token: ${{ secrets.SUBMODULES_PAT }}
```

## Security Considerations

1. **Token Scope**: The PAT has access to all your private repositories. Consider using a dedicated service account.

2. **Token Rotation**: Set up regular token rotation and update the secret accordingly.

3. **Repository Access**: Ensure the token owner has appropriate access to all submodule repositories.

4. **Audit Trail**: Monitor token usage through GitHub's audit logs.

## Troubleshooting

### Common Issues

1. **"Repository not found" errors**
   - Verify the PAT has access to all submodule repositories
   - Check that repository URLs in `.gitmodules` are correct

2. **Authentication failures**
   - Ensure `SUBMODULES_PAT` secret is correctly set
   - Verify the token hasn't expired

3. **Submodule sync issues**
   - Make sure submodules are properly initialized
   - Check for any merge conflicts in submodules

### Debug Commands

```bash
# Check submodule status
git submodule status

# Initialize and update submodules
git submodule update --init --recursive

# Sync submodule URLs
git submodule sync --recursive
```

## Local Development

For local development with private submodules:

```bash
# Clone with submodules
git clone --recursive https://github.com/Ruixiaoke/ASimpleStarGazer.git

# If already cloned, initialize submodules
git submodule update --init --recursive

# Update submodules to latest
git submodule update --remote
```

## Next Steps

1. ✅ Create and configure the `SUBMODULES_PAT` token
2. ✅ Test a simple workflow to ensure submodules are accessible
3. ✅ Monitor workflow runs for any authentication issues
4. ✅ Set up token rotation reminders

All CI/CD workflows are now configured to work seamlessly with your private submodules!