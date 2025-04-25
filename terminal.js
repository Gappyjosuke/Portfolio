const output = document.getElementById("terminalOutput");
const username = localStorage.getItem("portfolioUsername") || "visitor";

const commands = ["help","home", "about","skills","learning","clear", "socials","contact", "projects", "profile", "getlinked", "gethub"];

const asciiArt = `
<span style="color:#9bc1e8">
               ╔══════════════════════════════════════════════════════════════════════════════════════════╗
               ║                                                                                          ║
               ║   '||''|.   ..|''||   '||''|.   |''||''| '||''''|  ..|''||   '||'      '||'  ..|''||     ║
               ║    ||   || .|'    ||   ||   ||     ||     ||  .   .|'    ||   ||        ||  .|'    ||    ║
               ║    ||...|' ||      ||  ||''|'      ||     ||''|   ||      ||  ||        ||  ||      ||   ║
               ║    ||      '|.     ||  ||   |.     ||     ||      '|.     ||  ||        ||  '|.     ||   ║
               ║   .||.      ''|...|'  .||.  '|'   .||.   .||.      ''|...|'  .||.....| .||.  ''|...|'    ║
               ║                                                                                          ║
               ╚══════════════════════════════════════════════════════════════════════════════════════════╝
</span>
`;

const welcomeMsg = `
<span style="color:#a3be8c">Welcome!</span><br>
To get started, type <span style="color:#bf616a;font-weight:bold">HELP</span>.<br>
Use <span style="color:#ebcb8b;font-weight:bold">TAB</span> for auto-complete.<br>
Use <span style="color:#d08770;font-weight:bold">↑</span>/<span style="color:#d08770;font-weight:bold">↓</span> to scroll command history.<br>
`;

function updatePrompt() {
  return `<span style="color:#a3be8c">${username}@portfolio</span><span style="color:#88c0d0">:~$</span>`;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag]));
}

function appendOutput(text, isHTML = false) {
  const div = document.createElement("div");
  div.className = "terminal-block";
  div.innerHTML = isHTML ? text : escapeHTML(text);  // This line ensures HTML tags are interpreted correctly
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function createInputLine() {
  const line = document.createElement("div");
  line.className = "input-line";

  const prompt = document.createElement("span");
  prompt.innerHTML = updatePrompt();

  const input = document.createElement("input");
  input.className = "terminal-input";
  input.autofocus = true;

  line.append(prompt, input);
  output.appendChild(line);
  input.focus();

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const command = input.value;
      line.remove();
      appendOutput(`${username}@portfolio:~$ ${command}`);
      handleCommand(command);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = commands.find(cmd => cmd.startsWith(input.value));
      if (match) input.value = match;
    }
  });
}

function clearTerminal() {
  output.innerHTML = asciiArt;
  appendOutput(welcomeMsg, true);
  createInputLine();
}

function handleCommand(cmd) {
  const command = cmd.trim().toLowerCase();

  const commandMap = {
    help: () => appendOutput(`<span style="color:#ebcb8b">Available commands:</span><br>
      home          basic information<br>
      skills        view my skills<br>
      learning      my learning paths<br> 
      about         about Sastha Ruban<br>
      clear         clear the terminal<br>
      education     my education background<br>
      gui           go to my portfolio in GUI<br>
      help          check available commands<br>
      history       view command history<br>
      projects      view projects that I've coded<br>
      contact       check out my social accounts<br>`, true),

    about: () => appendOutput(`
        <div style="padding: 10px;">
          <h3 style="color:#a3be8c;">[+] About</h3>
          <br>I am a Computer Engineer with a growing focus on cybersecurity and networking.</br>
          <br>My core interest lies in understanding how systems, networks, and devices operate in real-world environments.</br>
          <br>I work with Linux-based systems, network configuration tools, and basic security utilities to build secure and reliable setups.</br>
          <br>I’ve gained hands-on experience with tools like Nmap, Wireshark, Aircrack-ng, and Packet Tracer in test environments.</br>
          <br>I am currently building my skill set around network infrastructure, system-level troubleshooting, and cybersecurity fundamentals with a practical, problem-solving approach.</br>
          <br>Type help to move on !!</br>
          </div>
    `, true),
    skills: () => appendOutput(`
      <div style="padding: 10px;">
        <h3 style="color:#a3be8c;">[+] Skills</h3>
        <br><strong>[-]Core Areas:</strong></br>
               <li>Networking Setup and Troubleshooting</li>
               <li>System-Level Debugging</li>
               <li>Cybersecurity Fundamentals</li>
        <br><strong>[-]Tools & Utilities:</strong></br>
               <li>Wireshark (packet analysis)</li>
               <li>Nmap (network scanning)</li>
               <li>Aircrack-ng (wireless testing)</li>
               <li>Cisco Packet Tracer (network simulation)</li>
               <li>Linux (terminal-based system management)</li>
        <br>Type help to move on !!</br>
        </div>
    `, true),

    clear: () => clearTerminal(),

    home: () => appendOutput(`
      <div style="padding: 10px;">
        <h3 style="color:#a3be8c;">[+] Home</h3>
        <br>Hi, I’m <strong>Sastha Ruban</strong>.</br>
        <br>I’m a Computer Engineer focused on cybersecurity and networking.</br>
        <br>I work with tools, systems, and real-world setups to understand how devices connect, communicate, and stay secure.</br>
        <br>Type help to move on !!</br>
        </div>
    `, true),


    education: () => appendOutput(`
      <div style="padding: 10px;">
        <h3 style="color:#a3be8c;">[+] Education</h3>
        <br><strong>Degree:</strong> B.E. in Computer Science and Engineering</br>
        <br><strong>Institution:</strong> Mohamed Sathak Engineering College, Kilakarai</br>
        <br><strong>CGPA:</strong> 8.15 / 10</br>
        <br><strong>Focused Subjects:</strong></br>
          <li>Linux Operating Systems</li>
          <li>Computer Engineer</li>
          <li>Cybersecurity & Networking</li>
          <li>Software Engineering</li>
        <br>Type help to move on !!</br>
        </div>
    `, true),

    

    gui: () => window.open("https://your-portfolio-link.com", "_blank"),

    history: () => appendOutput(`🕒 History tracking is under development.`),
    contact: () => appendOutput(`
      <div style="padding: 10px;">
        <h3 style="color:#a3be8c;">[+] Contact</h3>
        <br>Let’s connect.</br>
        <br>If you’d like to collaborate or discuss cybersecurity and networking, reach out via:</br>
          <li><strong>Email:</strong> <a href="mailto:sastharuban24@gmail.com">sastharuban24@gmail.com</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sastharuban" target="_blank">linkedin.com/in/sastharuban</a></li>
        <br>Type help to move on !!</br>
        </div>
    `, true),
    projects: () => appendOutput(`
      <div style="padding: 10px;">
        <h3 style="color:#a3be8c;">[+] Projects / Labs / Practice</h3>
          <li><strong>Wireless Network Testing – Lab Setup:</strong> Used Aircrack-ng to capture and analyze wireless packets in a controlled test environment using Kali Linux.</li>
          <li><strong>Network Simulation – Cisco Packet Tracer:</strong> Designed and configured simulated LAN setups including routers, switches, IP addressing, and access rules.</li>
          <li><strong>Basic System Hardening – Linux:</strong> Experimented with user permissions, firewall rules, and SSH config to reduce attack surface on Linux-based systems.</li>
        <br>Type help to move on !!</br>
        </div>
    `, true),
    learning: () => appendOutput(`
      <div style="padding: 10px;">
        <h3 style="color:#a3be8c;">[+] Tools I'm Learning</h3>
          <li>Burp Suite – for web-based security testing</li>
          <li>Hydra – for login brute-force testing in lab</li>
          <li>Ettercap – for network-level sniffing and MITM</li>
          <li>OpenVAS – for vulnerability scanning</li>
        <br>Type help to move on !!</br>     
        </div>
    `, true),

   
    
  };

  if (commandMap[command]) {
    commandMap[command]();
  } else {
    appendOutput(`Command not found: ${command}`);
  }

  createInputLine();
}

window.onload = () => clearTerminal();
