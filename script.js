function handleResize() {
  if (window.innerWidth <= 780) {
    help?.classList.remove('d-none');
  } else {
    help?.classList.add('d-none');
  }
}
