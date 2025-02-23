const scriptURL = 'https://script.google.com/macros/s/AKfycbz98W9p7B98T7J84_IVqdQoDN92nEFFbTYmTS9s-yhBew3zKIBuaV_d69-4sXsn9kS0hg/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const submitButton = form.querySelector('button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitButton.disabled = true;  // Disable button after submission

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form),
    });

    if (response.ok) {
      msg.innerHTML = "✅ Thank You For Subscribing!";
      msg.style.color = "#61b752";  // Green color for success
      form.reset();
    } else {
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    msg.innerHTML = "❌ Something went wrong! Please try again.";
    msg.style.color = "red";  // Red color for errors
    console.error('Error!', error.message);
  }

  setTimeout(() => {
    msg.innerHTML = "";
  }, 5000);

  submitButton.disabled = false;  // Re-enable the button
});
