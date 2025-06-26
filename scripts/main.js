document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById("commandInput");
    const terminalOutput = document.getElementById("terminalOutput");
    const dirList = document.getElementById("dirList");
    let directories = ['/home'];
    let currentDir = '/home';
    let files = [];
  
    // Event listener for command input
    commandInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const command = commandInput.value.trim();
        const parts = command.split(" ");
        const cmd = parts[0];
        const arg = parts[1];
  
        // Handle different commands
        switch (cmd) {
          case "cd":
            changeDirectory(arg);
            break;
          case "mkdir":
            if (arg) createDirectory(arg);
            else alert("Please provide a directory name.");
            break;
          case "rmdir":
            if (arg) removeDirectory(arg);
            else alert("Please provide a directory name.");
            break;
          case "touch":
            if (arg) createFile(arg);
            else alert("Please provide a file name.");
            break;
          case "rm":
            if (arg) removeFile(arg);
            else alert("Please provide a file name.");
            break;
          case "ls":
            listContents();
            break;
          case "pwd":
            alert("Current directory: " + currentDir);
            break;
          case "clear":
            clearTerminal();
            break;
          default:
            alert(`Command '${cmd}' not recognized.`);
        }
  
        commandInput.value = ""; // Reset input field
        scrollToBottom(); // Scroll to bottom of terminal output
      }
    });
  
    // Change directory command
    function changeDirectory(dirName) {
      if (dirName && directories.includes(dirName)) {
        currentDir = dirName;
        terminalOutput.innerHTML += `<div>Changed to directory: ${dirName}</div>`;
      } else if (dirName) {
        terminalOutput.innerHTML += `<div>Directory '${dirName}' not found.</div>`;
      } else {
        terminalOutput.innerHTML += `<div>Current directory: ${currentDir}</div>`;
      }
    }
  
    // Create directory command
    function createDirectory(dirName) {
      if (directories.includes(dirName)) {
        terminalOutput.innerHTML += `<div>Directory '${dirName}' already exists.</div>`;
      } else {
        directories.push(dirName);
        terminalOutput.innerHTML += `<div>Directory '${dirName}' created.</div>`;
        renderDirectoryList();
      }
    }
  
    // Remove directory command
    function removeDirectory(dirName) {
      if (directories.includes(dirName)) {
        directories = directories.filter(dir => dir !== dirName);
        terminalOutput.innerHTML += `<div>Directory '${dirName}' removed.</div>`;
        renderDirectoryList();
      } else {
        terminalOutput.innerHTML += `<div>Directory '${dirName}' not found.</div>`;
      }
    }
  
    // Create file command
    function createFile(fileName) {
      if (files.includes(fileName)) {
        terminalOutput.innerHTML += `<div>File '${fileName}' already exists.</div>`;
      } else {
        files.push(fileName);
        terminalOutput.innerHTML += `<div>File '${fileName}' created.</div>`;
        renderDirectoryList();
      }
    }
  
    // Remove file command
    function removeFile(fileName) {
      if (files.includes(fileName)) {
        files = files.filter(file => file !== fileName);
        terminalOutput.innerHTML += `<div>File '${fileName}' removed.</div>`;
        renderDirectoryList();
      } else {
        terminalOutput.innerHTML += `<div>File '${fileName}' not found.</div>`;
      }
    }
  
    // List directory contents
    function listContents() {
      if (directories.length > 0 || files.length > 0) {
        terminalOutput.innerHTML += `<div>Directories: ${directories.join(", ")}</div>`;
        terminalOutput.innerHTML += `<div>Files: ${files.join(", ")}</div>`;
      } else {
        terminalOutput.innerHTML += "<div>No directories or files to display.</div>";
      }
    }
  
    // Clear terminal output
    function clearTerminal() {
      terminalOutput.innerHTML = "";
    }
  
    // Render directory list for visual feedback
    function renderDirectoryList() {
      dirList.innerHTML = ""; // Clear current list
      directories.forEach(dir => {
        const dirElement = document.createElement("div");
        dirElement.classList.add("directory");
        dirElement.textContent = dir;
        dirList.appendChild(dirElement);
      });
      files.forEach(file => {
        const fileElement = document.createElement("div");
        fileElement.classList.add("file");
        fileElement.textContent = file;
        dirList.appendChild(fileElement);
      });
    }
  
    // Scroll terminal output to the bottom
    function scrollToBottom() {
      const terminal = document.getElementById("terminalOutput");
      terminal.scrollTop = terminal.scrollHeight;
    }
  });
  // Toggle Dark Mode

