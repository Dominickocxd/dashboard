// DECLARACIÓN INICIAL DE USUARIOS (SOLO UNA VEZ)
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
  {
    nombre: 'María Pia',
    email: 'maria@demo.com',
    rol: 'Administrador',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg'
  },
  {
    nombre: 'Luis Herrera',
    email: 'luis@demo.com',
    rol: 'Editor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }
];

let editandoIdx = null;

// FUNCIÓN PARA GUARDAR EN LOCALSTORAGE
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// DOMContentLoaded - Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
  // Configurar usuario actual
  const currentUserEmail = localStorage.getItem('currentUserEmail') || usuarios[0].email;
  const currentUser = usuarios.find(u => u.email === currentUserEmail) || usuarios[0];
  
  document.getElementById('current-user-avatar').src = currentUser.avatar;
  document.getElementById('current-user-name').textContent = currentUser.nombre;
  document.getElementById('current-user-role').textContent = currentUser.rol;
  localStorage.setItem('currentUserEmail', currentUser.email);

  // Botón de logout
  const logoutBtn = document.createElement('a');
  logoutBtn.href = '#';
  logoutBtn.innerHTML = '<i class="bi bi-box-arrow-right"></i> Cerrar Sesión';
  logoutBtn.style.cssText = 'color: #fff; padding: 14px 32px; margin-top: auto; margin-bottom: 20px;';
  logoutBtn.onclick = function(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  };
  document.querySelector('.sidebar').appendChild(logoutBtn);
});

// REFERENCIAS A ELEMENTOS
const dashboardLink = document.getElementById('dashboard-link');
const usuariosLink = document.getElementById('usuarios-link');
const configLink = document.getElementById('config-link');
const mainContent = document.getElementById('main-content');

// -------- FUNCIONES PRINCIPALES --------

// DASHBOARD

 function showDashboard() {
  dashboardLink.classList.add('active');
  usuariosLink.classList.remove('active');
  configLink.classList.remove('active');
  
  const reportesActuales = [
    {
      id: 'sanMartin',
      titulo: 'San Martín',
      icono: 'bi-map',
      url: '50954441-fb05-469d-adf0-e1bc0c7fa24c/page/PWlQF',
      descripcion: 'Datos completos de nacimientos en la región'
    },
    {
      id: 'loreto',
      titulo: 'Loreto',
      icono: 'bi-map',
      url: 'e1620bea-0672-446f-9625-74973bbdd6a7/page/qtMQF',
      descripcion: 'Datos completos de nacimientos en la región'
    }
  ];

  const reportesAnteriores = [
    {
      id: 'nacimientosFecha',
      titulo: 'Nacimientos por fecha',
      icono: 'bi-calendar-date',
      url: '6ef4c7a8-19c3-4f5b-ba67-0fc2c5eab7f1/page/cYOPF',
      descripcion: 'Series históricas de nacimientos'
    },
  ];

  mainContent.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-overlay"></div>
      
      <div class="dashboard-content">
        <div class="dashboard-header">
          <h1>Sistema Integrado de Monitoreo de Nacimientos</h1>
          <p class="lead">Visualización de datos regionales en tiempo real</p>
        </div>
        
        <div class="dashboard-section">
          <h2><i class="bi bi-speedometer2"></i> Dashboards Regionales</h2>
          <div class="dashboard-cards">
            ${reportesActuales.map((reporte, index) => `
              <div class="dashboard-card">
                <div class="card-icon"><i class="bi ${reporte.icono}"></i></div>
                <h3>${reporte.titulo}</h3>
                <p>${reporte.descripcion}</p>
                <button class="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#${reporte.id}Modal">
                  <i class="bi bi-box-arrow-in-right"></i> Ver Dashboard
                </button>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="dashboard-section">
          <h2><i class="bi bi-archive"></i> Reportes Especializados</h2>
          <div class="dashboard-cards">
            ${reportesAnteriores.map((reporte, index) => `
              <div class="dashboard-card">
                <div class="card-icon"><i class="bi ${reporte.icono}"></i></div>
                <h3>${reporte.titulo}</h3>
                <p>${reporte.descripcion}</p>
                <button class="btn btn-secondary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#${reporte.id}Modal">
                  <i class="bi bi-box-arrow-in-right"></i> Ver Reporte
                </button>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="dashboard-footer">
          <p>Fuente oficial: Dirección Regional de Salud - Gobierno Regional</p>
          <small>
            <i class="bi bi-info-circle"></i> Datos actualizados al ${new Date().toLocaleDateString('es-PE', {year: 'numeric', month: 'long', day: 'numeric'})}
          </small>
        </div>
      </div>
    </div>

    <!-- Modals (se mantienen igual) -->
    ${[...reportesActuales, ...reportesAnteriores].map(reporte => `
      <div class="modal fade" id="${reporte.id}Modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">${reporte.titulo}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-0" style="height: 70vh;">
              <iframe src="https://lookerstudio.google.com/embed/reporting/${reporte.url}" 
                      width="100%" 
                      height="100%" 
                      frameborder="0" 
                      style="border:0" 
                      allowfullscreen
                      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `).join('')}
  `;
}

  // Activar popovers
  setTimeout(() => {
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      new bootstrap.Popover(el);
    });
  }, 50);

// GESTIÓN DE USUARIOS
function showUsuarios() {
  dashboardLink.classList.remove('active');
  usuariosLink.classList.add('active');
  configLink.classList.remove('active');
  
  mainContent.innerHTML = `
    <div class="top-bar">
      <h3>Usuarios Administradores</h3>
      <button class="btn btn-primary" onclick="mostrarFormUsuario()">
        <i class="bi bi-plus"></i> Agregar Usuario
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${usuarios.map((user, index) => `
            <tr>
              <td>${user.nombre}</td>
              <td>${user.email}</td>
              <td>${user.rol}</td>
              <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editarUsuario(${index})">
                  <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarUsuario(${index})">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// CONFIGURACIÓN
function showConfig() {
  dashboardLink.classList.remove('active');
  usuariosLink.classList.remove('active');
  configLink.classList.add('active');
  
  mainContent.innerHTML = `
    <div class="config-container">
      <h3 class="config-title">Configuración del Sistema</h3>
      
      <div class="config-section">
        <h4><i class="bi bi-people-fill"></i> Gestión de Perfiles</h4>
        <div class="config-card">
          <h5>Cambiar foto de perfil de usuarios</h5>
          <div class="user-selection">
            <label for="user-select">Seleccionar usuario:</label>
            <select id="user-select" class="form-select">
              ${usuarios.map(user => `
                <option value="${user.email}">${user.nombre} (${user.rol})</option>
              `).join('')}
            </select>
          </div>
          <div class="profile-picture-edit">
            <img id="selected-user-avatar" src="${usuarios[0].avatar}" 
                 alt="Foto de perfil" class="user-avatar">
            <button class="btn btn-primary mt-3" onclick="document.getElementById('user-photo-upload').click()">
              <i class="bi bi-camera-fill"></i> Cambiar Foto
            </button>
            <input type="file" id="user-photo-upload" accept="image/*" style="display: none;">
          </div>
        </div>
      </div>
      
      <div class="config-section mt-4">
        <h4><i class="bi bi-gear-fill"></i> Configuración del Sistema</h4>
        <div class="config-card">
          <p>Próximamente podrás cambiar opciones del sistema aquí.</p>
        </div>
      </div>
    </div>
  `;

  // Cambiar foto de perfil
  document.getElementById('user-photo-upload').addEventListener('change', function(e) {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const email = document.getElementById('user-select').value;
        const user = usuarios.find(u => u.email === email);
        if (user) {
          user.avatar = e.target.result;
          document.getElementById('selected-user-avatar').src = e.target.result;
          guardarUsuarios();
          
          if (email === localStorage.getItem('currentUserEmail')) {
            document.getElementById('current-user-avatar').src = e.target.result;
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });
}

// FORMULARIO DE USUARIO
window.mostrarFormUsuario = function(idx = null) {
  editandoIdx = idx;
  const user = idx !== null ? usuarios[idx] : { nombre: '', email: '', rol: 'Administrador' };
  
  mainContent.innerHTML = `
    <div class="card p-4" style="max-width: 600px; margin: 0 auto;">
      <h3 class="mb-4">${idx !== null ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
      <form id="usuario-form">
        <div class="mb-3">
          <label class="form-label">Nombre:</label>
          <input id="nombre" type="text" class="form-control" value="${user.nombre}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Correo:</label>
          <input id="email" type="email" class="form-control" value="${user.email}" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Rol:</label>
          <select id="rol" class="form-select">
            <option value="Administrador" ${user.rol === 'Administrador' ? 'selected' : ''}>Administrador</option>
            <option value="Editor" ${user.rol === 'Editor' ? 'selected' : ''}>Editor</option>
          </select>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-4">
          <button type="button" class="btn btn-secondary" onclick="showUsuarios()">Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('usuario-form').onsubmit = function(e) {
    e.preventDefault();
    const userData = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      rol: document.getElementById('rol').value,
      avatar: idx !== null ? usuarios[idx].avatar : `https://ui-avatars.com/api/?name=${document.getElementById('nombre').value}&background=2563eb&color=fff`
    };

    if (editandoIdx !== null) {
      usuarios[editandoIdx] = userData;
    } else {
      usuarios.push(userData);
    }
    
    guardarUsuarios();
    showUsuarios();
  };
};

window.editarUsuario = function(idx) {
  mostrarFormUsuario(idx);
};

window.eliminarUsuario = function(idx) {
  if (confirm('¿Seguro que quieres eliminar este usuario?')) {
    usuarios.splice(idx, 1);
    guardarUsuarios();
    showUsuarios();
  }
};

// NAVEGACIÓN
dashboardLink.onclick = (e) => { e.preventDefault(); showDashboard(); };
usuariosLink.onclick = (e) => { e.preventDefault(); showUsuarios(); };
configLink.onclick = (e) => { e.preventDefault(); showConfig(); };

// INICIO
showDashboard();