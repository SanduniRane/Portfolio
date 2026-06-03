const passwordInput = document.getElementById('password');
const checkBtn = document.getElementById('checkBtn');
const strengthText = document.getElementById('strength');
const leakText = document.getElementById('leak');

// Function to check password strength
function checkStrength(password) {
    let strength = 0;
    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[\W]/.test(password)) strength++;

    switch(strength) {
        case 5: return 'Very Strong';
        case 4: return 'Strong';
        case 3: return 'Moderate';
        case 2: return 'Weak';
        default: return 'Very Weak';
    }
}

// Function to check if password is leaked using Have I Been Pwned API
async function checkLeak(password) {
    const sha1 = await sha1Hash(password);
    const prefix = sha1.substring(0, 5);
    const suffix = sha1.substring(5).toUpperCase();

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();
    
    const lines = text.split('\n');
    for (let line of lines) {
        const [hashSuffix, count] = line.split(':');
        if (hashSuffix === suffix) {
            return parseInt(count);
        }
    }
    return 0;
}

// SHA1 hashing function
async function sha1Hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// Button click event
checkBtn.addEventListener('click', async () => {
    const password = passwordInput.value;
    if (!password) return alert('Please enter a password.');

    // Check strength
    strengthText.textContent = `Strength: ${checkStrength(password)}`;

    // Check leak
    leakText.textContent = 'Checking leak...';
    const leakCount = await checkLeak(password);
    if (leakCount > 0) {
        leakText.textContent = `This password has been leaked ${leakCount} times! Choose another.`;
    } else {
        leakText.textContent = 'No leaks found. Good choice!';
    }
});
