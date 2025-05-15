function showPage(page) {
    const pages = ['sign-in', 'forgot-password', 'verification', 'sign-up'];

    // Reset form inputs before switching pages
    pages.forEach(p => {
        const form = document.querySelector(`#${p} form`);
        if (form) {
            form.reset(); // Reset all inputs in the form
        }
        document.getElementById(p).style.display = (p === page) ? 'block' : 'none';
    });
}
