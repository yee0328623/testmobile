# apt install net-tools

# Exit if any command fails
set -e

# Specify the Miniconda version
MINICONDA_VERSION="latest"
MINICONDA_SCRIPT="Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh"
MINICONDA_URL="https://repo.anaconda.com/miniconda/$MINICONDA_SCRIPT"

# Download the latest shell script
wget --quiet $MINICONDA_URL -O $MINICONDA_SCRIPT

# Make the Miniconda installation script executable
chmod +x $MINICONDA_SCRIPT

# Initialize conda
# ~/miniconda3/bin/conda init bash

# Run the Miniconda installadtion script in silent mode
./$MINICONDA_SCRIPT -b

# Clean up the installer script
rm $MINICONDA_SCRIPT

echo "Miniconda3 installation completed."

    # bash sudo install.sh

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