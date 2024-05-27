#!/bin/bash

# Variables
REPO_PATH="/home/masuma/Desktop/practice/socket.io"  # Path to your local repository
REMOTE_URL="https://github.com/abdurrahim220/socket.io-sms.git"  # Remote repository URL
COMMIT_MESSAGE="first commit"  # Commit message
BRANCH="main"  # Branch name

# Change to the repository directory
cd "$REPO_PATH" || { echo "Repository path not found!"; exit 1; }

# Initialize the Git repository
git init

# Check if README.md exists, if not, create it
if [ ! -f README.md ]; then
    echo "# Project Title" > README.md
    git add README.md
fi

# Add all files to staging
git add .

# Commit the changes
git commit -m "$COMMIT_MESSAGE"

# Create and switch to the main branch
git branch -M "$BRANCH"

# Add the remote repository
git remote remove origin 2>/dev/null  # Remove existing remote 'origin' if it exists
git remote add origin "$REMOTE_URL"

# Push the changes to the remote repository
git push -u origin "$BRANCH"

# Check the push status
if [ $? -eq 0 ]; then
  echo "Push successful!"
else
  echo "Push failed!"
fi
