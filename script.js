/* =========================
   DATA
========================= */

let currentAction = "";

let barangMasuk = 0;
let barangKeluar = 0;

/* =========================
   LOGIN
========================= */

function login(){

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  if(
    username === "admin" &&
    password === "bloodline"
  ){

    masukDashboard("ADMIN");

  }

  else if(
    username === "tamu" &&
    password === "guest"
  ){

    masukDashboard("TAMU");

    document.getElementById("adminMenu")
      .style.display = "none";

  }

  else{

    alert("Username / Password Salah");

  }

}

function masukDashboard(role){

  document.getElementById("loginPage")
    .style.display = "none";

  document.getElementById("dashboard")
    .style.display = "block";

  document.getElementById("roleText")
    .innerText =
    "Login sebagai : " + role;

}

/* =========================
   LOGOUT
========================= */

function logout(){

  location.reload();

}

/* =========================
   SIDEBAR
========================= */

function toggleSidebar(){

  document.getElementById("sidebar")
    .classList.toggle("active");

}

/* =========================
   MODAL
========================= */

function openTambah(){

  currentAction = "tambah";

  document.getElementById("modal")
    .style.display = "flex";

  document.getElementById("modalTitle")
    .innerText = "Tambah Barang";

  document.getElementById("manualInput")
    .style.display = "block";

  document.getElementById("selectInput")
    .style.display = "none";

}

function openMasuk(){

  currentAction = "masuk";

  document.getElementById("modal")
    .style.display = "flex";

  document.getElementById("modalTitle")
    .innerText = "Barang Masuk";

  document.getElementById("manualInput")
    .style.display = "none";

  document.getElementById("selectInput")
    .style.display = "block";

  updateSelect();

}

function openKeluar(){

  currentAction = "keluar";

  document.getElementById("modal")
    .style.display = "flex";

  document.getElementById("modalTitle")
    .innerText = "Barang Keluar";

  document.getElementById("manualInput")
    .style.display = "none";

  document.getElementById("selectInput")
    .style.display = "block";

  updateSelect();

}

/* =========================
   UPDATE SELECT
========================= */

function updateSelect(){

  const select =
    document.getElementById("selectedItem");

  select.innerHTML = "";

  const rows =
    document.querySelectorAll("#stockTable tr");

  rows.forEach(row => {

    const nama =
      row.children[1].innerText;

    select.innerHTML += `
      <option value="${nama}">
        ${nama}
      </option>
    `;

  });

}

/* =========================
   SUBMIT
========================= */

function submitAction(){

  const qty =
    parseInt(
      document.getElementById("itemQty").value
    );

  if(!qty || qty <= 0){

    alert("Jumlah tidak valid");
    return;

  }

  const tanggal =
    new Date().toLocaleDateString("id-ID");

  const table =
    document.getElementById("stockTable");

  /* TAMBAH */

  if(currentAction === "tambah"){

    const nama =
      document.getElementById("itemName").value;

    if(nama.trim() === ""){

      alert("Nama barang kosong");
      return;

    }

    const row =
      document.createElement("tr");

    row.innerHTML = `
      <td>
        <input type="checkbox">
      </td>

      <td>${nama}</td>

      <td>${qty}</td>

      <td>${tanggal}</td>

      <td>
        <span class="status">
          Tersedia
        </span>
      </td>
    `;

    table.appendChild(row);

    barangMasuk += qty;

  }

  /* MASUK */

  if(currentAction === "masuk"){

    const selected =
      document.getElementById("selectedItem")
      .value;

    const rows =
      document.querySelectorAll("#stockTable tr");

    rows.forEach(row => {

      if(
        row.children[1].innerText === selected
      ){

        let oldQty =
          parseInt(row.children[2].innerText);

        oldQty += qty;

        row.children[2].innerText = oldQty;

        row.children[3].innerText = tanggal;

      }

    });

    barangMasuk += qty;

  }

  /* KELUAR */

  if(currentAction === "keluar"){

    const selected =
      document.getElementById("selectedItem")
      .value;

    const rows =
      document.querySelectorAll("#stockTable tr");

    rows.forEach(row => {

      if(
        row.children[1].innerText === selected
      ){

        let oldQty =
          parseInt(row.children[2].innerText);

        if(oldQty < qty){

          alert("Stock tidak cukup");
          return;

        }

        oldQty -= qty;

        row.children[2].innerText = oldQty;

        row.children[3].innerText = tanggal;

      }

    });

    barangKeluar += qty;

  }

  updateDashboard();

  closeModal();

}

/* =========================
   DELETE
========================= */

function hapusBarang(){

  const rows =
    document.querySelectorAll("#stockTable tr");

  rows.forEach(row => {

    const check =
      row.querySelector("input");

    if(check.checked){

      row.remove();

    }

  });

  updateDashboard();

}

/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard(){

  const rows =
    document.querySelectorAll("#stockTable tr");

  let totalBarang = rows.length;

  let totalStock = 0;

  rows.forEach(row => {

    totalStock +=
      parseInt(row.children[2].innerText);

  });

  document.getElementById("totalBarang")
    .innerText = totalBarang;

  document.getElementById("barangMasuk")
    .innerText = barangMasuk;

  document.getElementById("barangKeluar")
    .innerText = barangKeluar;

  document.getElementById("totalStock")
    .innerText = totalStock;

  document.getElementById("rekapMasuk")
    .innerText = barangMasuk;

  document.getElementById("rekapKeluar")
    .innerText = barangKeluar;

  document.getElementById("rekapStock")
    .innerText = totalStock;

}

/* =========================
   REKAP
========================= */

function toggleRekap(){

  const rekap =
    document.getElementById("rekapBox");

  if(
    rekap.style.display === "block"
  ){

    rekap.style.display = "none";

  }

  else{

    rekap.style.display = "block";

  }

}

/* =========================
   CLOSE MODAL
========================= */

function closeModal(){

  document.getElementById("modal")
    .style.display = "none";

  document.getElementById("itemName")
    .value = "";

  document.getElementById("itemQty")
    .value = "";

}

/* CLOSE OUTSIDE */

window.onclick = function(e){

  const modal =
    document.getElementById("modal");

  if(e.target === modal){

    closeModal();

  }

}