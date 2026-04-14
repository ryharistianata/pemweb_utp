function isValidEmail(email) {
  // Pola regex untuk format email standar
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showError(inputElement, message) {
  // Hapus pesan error lama jika ada
  clearError(inputElement);

  inputElement.style.borderColor = '#ff4444';
  inputElement.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';

  const errorEl = document.createElement('p');
  errorEl.classList.add('error-message');
  errorEl.textContent = '⚠ ' + message;
  errorEl.style.color = '#ff6666';
  errorEl.style.fontSize = '0.8rem';
  errorEl.style.marginTop = '0.3rem';
  errorEl.style.fontFamily = 'Courier New, monospace';

  inputElement.parentNode.appendChild(errorEl);
}

function clearError(inputElement) {
  // Kembalikan gaya border ke normal
  inputElement.style.borderColor = '';
  inputElement.style.boxShadow = '';

  const parent = inputElement.parentNode;
  const existingError = parent.querySelector('.error-message');
  if (existingError) {
    parent.removeChild(existingError);
  }
}

function showSuccess(inputElement) {
  clearError(inputElement);
  inputElement.style.borderColor = '#00ffaa';
  inputElement.style.boxShadow = '0 0 10px rgba(0, 255, 170, 0.3)';
}

function validateContactForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('nama');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subjek');
  const messageInput = document.getElementById('pesan');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  let isValid = true; 

  if (name === '') {
    showError(nameInput, 'Nama tidak boleh kosong.');
    isValid = false;
  } else if (name.length < 3) {
    showError(nameInput, 'Nama minimal 3 karakter.');
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  if (email === '') {
    showError(emailInput, 'Email tidak boleh kosong.');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, 'Format email tidak valid (contoh: nama@email.com).');
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (subject === '') {
    showError(subjectInput, 'Subjek tidak boleh kosong.');
    isValid = false;
  } else {
    showSuccess(subjectInput);
  }

  if (message === '') {
    showError(messageInput, 'Pesan tidak boleh kosong.');
    isValid = false;
  } else if (message.length < 20) {
    showError(messageInput, 'Pesan terlalu pendek, minimal 20 karakter.');
    isValid = false;
  } else {
    showSuccess(messageInput);
  }

  if (isValid) {
    showSuccessNotification(name);
  }

  return false; 
}

function showSuccessNotification(userName) {
  // Cek apakah notifikasi sudah ada
  const existing = document.getElementById('successNotif');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.id = 'successNotif';
  notif.innerHTML = `
    <div style="
      position: fixed;
      top: 80px;
      right: 20px;
      background: #111118;
      border: 1px solid #00ffaa;
      border-radius: 12px;
      padding: 1.2rem 1.5rem;
      box-shadow: 0 0 30px rgba(0, 255, 170, 0.3);
      z-index: 9999;
      max-width: 300px;
      animation: fadeInUp 0.4s ease;
    ">
      <p style="color:#00ffaa; font-family:'Courier New',monospace; margin:0; font-size:0.9rem;">
        ✓ Pesan terkirim!
      </p>
      <p style="color:#8888aa; margin-top:0.4rem; font-size:0.85rem; margin-bottom:0;">
        Terima kasih, <strong style="color:#e8e8f0;">${userName}</strong>!<br>
        Saya akan segera menghubungi kamu.
      </p>
    </div>
  `;

  document.body.appendChild(notif);

  document.getElementById('contactForm').reset();

  const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
  inputs.forEach(function (input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  });

  setTimeout(function () {
    if (notif && notif.parentNode) {
      notif.style.transition = 'opacity 0.4s ease';
      notif.style.opacity = '0';
      setTimeout(function () { notif.remove(); }, 400);
    }
  }, 5000);
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', validateContactForm);
  }

  const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea, #contactForm select');
  inputs.forEach(function (input) {
    input.addEventListener('input', function () {
      // Hapus error saat pengguna mulai mengisi ulang
      if (this.value.trim() !== '') {
        clearError(this);
      }
    });
  });
});
