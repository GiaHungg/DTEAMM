let currentMode = 'trial'; // 'trial' hoặc 'package'

// Hàm chuyển đổi giữa Đăng ký tập thử và Đăng ký gói
function switchTab(mode, btnElement) {
    currentMode = mode;

    // Cập nhật giao diện nút Tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    // Toggle hiển thị các trường dữ liệu tương ứng
    if (mode === 'trial') {
        document.getElementById('trialFields').style.display = 'block';
        document.getElementById('packageFields').style.display = 'none';
        document.getElementById('btnSubmitText').innerText = 'XÁC NHẬN ĐĂNG KÝ TẬP THỬ';
    } else {
        document.getElementById('trialFields').style.display = 'none';
        document.getElementById('packageFields').style.display = 'block';
        document.getElementById('btnSubmitText').innerText = 'XÁC NHẬN ĐĂNG KÝ GÓI TẬP';
    }
}

// Xử lý gửi form
function submitForm() {
    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const sport = document.getElementById('sport').value;

    let detailHTML = `
        <p><strong>Loại hình:</strong> ${currentMode === 'trial' ? 'Đăng ký tập thử' : 'Đăng ký gói tập'}</p>
        <p><strong>Họ và tên:</strong> ${fullname}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Bộ môn:</strong> ${sport}</p>
    `;

    if (currentMode === 'trial') {
        const trialDate = document.getElementById('trialDate').value || 'Chưa chọn';
        detailHTML += `<p><strong>Lịch tập thử:</strong> ${trialDate}</p>`;
    } else {
        const duration = document.getElementById('duration').value;
        const level = document.getElementById('level').value;
        detailHTML += `<p><strong>Thời hạn gói:</strong> ${duration}</p>`;
        detailHTML += `<p><strong>Trình độ:</strong> ${level}</p>`;
    }

    document.getElementById('resultContent').innerHTML = detailHTML;
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('successBox').style.display = 'block';
}

function resetForm() {
    document.getElementById('registerForm').reset();
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('successBox').style.display = 'none';
}

// Tự động nhận biết Case 1 vs Case 2 qua URL
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const bomon = params.get('bomon');
    const trinhdo = params.get('trinhdo');

    // CASE 1: Nếu người dùng chọn gói ở trang Gói tập sang
    if (bomon || trinhdo) {
        // Tự chuyển sang Tab "Đăng ký gói tập"
        switchTab('package', document.getElementById('tabPackageBtn'));

        if (bomon) document.getElementById('sport').value = bomon;
        if (trinhdo) document.getElementById('level').value = trinhdo;

        document.getElementById('case1Notice').style.display = 'block';
    }
});

