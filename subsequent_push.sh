#!/bin/bash

# Variables
REPO_PATH="/home/masuma/Desktop/practice/socket.io"  # Path to your local repository location
COMMIT_MESSAGE="client and backend setup done"  # Commit message
BRANCH="main"  # Branch name

# Change to the repository directory
cd "$REPO_PATH" || { echo "Repository path not found!"; exit 1; }

# Check if the Git repository exists
if [ ! -d .git ]; then
  echo "This is not a Git repository. Please initialize it first with 'git init'."
  exit 1
fi

# Add all changes to staging
git add .

# Commit the changes
git commit -m "$COMMIT_MESSAGE"

# Push the changes to the remote repository
git push origin "$BRANCH"

# Check the push status
if [ $? -eq 0 ]; then
  echo "Push successful!"
else
  echo "Push failed!"
fi

