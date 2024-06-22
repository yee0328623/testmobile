#!/bin/bash

# Exit if any command fails
set -e

# Specify the Miniconda version
MINICONDA_VERSION="latest"
MINICONDA_SCRIPT="Miniconda3-${MINICONDA_VERSION}-Windows-x86_64.exe"
MINICONDA_URL="https://repo.anaconda.com/miniconda/$MINICONDA_SCRIPT"

# Download the latest installer
wget --quiet $MINICONDA_URL -O $MINICONDA_SCRIPT

# Run the Miniconda installation script in silent mode
./$MINICONDA_SCRIPT /S /D=%USERPROFILE%\Miniconda3

# Clean up the installer script
rm $MINICONDA_SCRIPT

# Initialize conda for Git Bash
echo "source \$HOME/Miniconda3/Scripts/activate" >> ~/.bashrc

echo "Miniconda3 installation completed."

# Reinitialize conda. After running this, close your current shell session, reopen Xshell, and try again.
    # ~/miniconda3/bin/conda init

# New a Miniconda environment
    # conda activate
    # conda create -n zx01 python=3.8
    # conda activate zx01
    # conda install -c conda-forge nodejs
    
# Verify that Node.js and npm are installed:
    # node -v
    # npm -v