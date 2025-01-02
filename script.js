const passwordList = document.getElementById('password-list');
const passwordForm = document.getElementById('password-form');
const loginInput = document.getElementById('login');
const urlInput = document.getElementById('url');
const passwordInput = document.getElementById('password');
const generatePasswordButton = document.getElementById('generate-password');
const passwordStrengthSelect = document.getElementById('password-strength');

const PASSWORD_KEY = 'passwords';

function loadPasswords() {
  const passwords = JSON.parse(localStorage.getItem(PASSWORD_KEY)) || [];
  passwordList.innerHTML = '';
  passwords.forEach((entry, index) => {
    const div = document.createElement('div');
    const textSpan = document.createElement('span');
    textSpan.textContent = `${entry.login} (${entry.url}): ${entry.password}`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deletePassword(index);
    div.appendChild(textSpan);
    div.appendChild(deleteButton);
    passwordList.appendChild(div);
  });
}

function addPassword(login, url, password) {
  const passwords = JSON.parse(localStorage.getItem(PASSWORD_KEY)) || [];
  passwords.push({ login, url, password });
  localStorage.setItem(PASSWORD_KEY, JSON.stringify(passwords));
  loadPasswords();
}

function deletePassword(index) {
  const passwords = JSON.parse(localStorage.getItem(PASSWORD_KEY)) || [];
  passwords.splice(index, 1);
  localStorage.setItem(PASSWORD_KEY, JSON.stringify(passwords));
  loadPasswords();
}

function generatePassword() {
  const strength = passwordStrengthSelect.value;
  let charset = 'abcdefghijklmnopqrstuvwxyz';
  let length = 8;

  if (strength === 'medium') {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    length = 12;
  } else if (strength === 'strong') {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    length = 16;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  passwordInput.value = password;
  return password;
}

passwordForm.addEventListener('submit', event => {
  event.preventDefault();
  const generatedPassword = passwordInput.value || generatePassword();
  addPassword(loginInput.value, urlInput.value, generatedPassword);
  loginInput.value = '';
  urlInput.value = '';
  passwordInput.value = '';
});

generatePasswordButton.addEventListener('click', () => {
    const generatedPassword = generatePassword();
    passwordInput.value = generatedPassword;
});

loadPasswords();