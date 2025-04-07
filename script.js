// ====== Navbar / Hamburger ======
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  overlay.classList.toggle("show");
  hamburger.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navLinks.classList.remove("open");
  overlay.classList.remove("show");
  hamburger.classList.remove("active");
});

// ====== Symptom Checker ======

const form = document.getElementById("symptom-form");
const input = document.getElementById("symptom-input");
const result = document.getElementById("symptom-result");

if (form && input && result) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const symptoms = input.value.trim();
    if (!symptoms) return;

    result.innerHTML = "🧠 Thinking... analyzing your symptoms...";
    result.classList.remove("hidden");

    const url = "/api/ask"; 
    const headers = {
      "Content-Type": "application/json",

    };

    const body = {
      model: "google/gemini-pro",
      messages: [
        {
          role: "user",
          content: `Act like a professional virtual medical assistant. Based on the user's symptoms below, give a very very short response with:

• Possible causes (bullet points)  
• Self-care tips  
• When to consult a doctor  

User Symptoms: ${symptoms}`,
        },
      ],
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "🤖 Sorry, no response.";

      // Format the reply to readable HTML
      const formattedReply =
        "<ul>" +
        reply
          .replace(/^## (.*?)$/gm, "<h3>$1</h3>") // Headings
          .replace(/^\* \*\*(.*?)\*\*: (.*?)$/gm, "<li><strong>$1:</strong> $2</li>") // Bullet with bold title
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
          .replace(/• /g, "<li>") // Bullet points
          .replace(/\n{2,}/g, "</ul><br><ul>") // New section = new list
          .replace(/\n/g, "") // Remove single line breaks
          .replace(/<ul><\/ul>/g, "") + // Remove empty lists
        "</ul>";

        const disclaimer = `
        <br>
        <strong style="color: red;">🩺 Remember:</strong> 
        <span style="color: gray;">
          This information is not a substitute for professional medical advice. Please consult with your doctor if you have any concerns about your health.
        </span>
      `;

      result.innerHTML = formattedReply + disclaimer;
    } catch (err) {
      console.error(err);
      result.innerHTML = "⚠️ Something went wrong. Try again later.";
    }
  });
} else {
  console.warn("Form or result element not found.");
}

// Scroll 

const startBtn = document.getElementById("start-btn");
const diagnosisSection = document.getElementById("Sym");

if (startBtn && diagnosisSection) {
  startBtn.addEventListener("click", () => {
    diagnosisSection.scrollIntoView({ behavior: "smooth" });
  });
}


// Find Doctor
const findDoctorBtn = document.getElementById("find-doctor-btn");

if (findDoctorBtn) {
  findDoctorBtn.addEventListener("click", () => {
    const symptoms = input.value.trim();
    if (!symptoms) {
      alert("Please enter your symptoms first.");
      return;
    }

    const query = encodeURIComponent(`doctor near me for ${symptoms}`);
    window.open(`https://www.google.com/search?q=${query}`, "_blank");
  });
}



window.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("map-frame");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Set Google Maps embed URL with current location
        iframe.src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      },
      (error) => {
        console.error("Geolocation failed:", error.message);
        iframe.src = "https://maps.google.com/maps?q=Balaghat&z=15&output=embed"; // fallback
      }
    );
  } else {
    console.warn("Geolocation not supported");
    iframe.src = "https://maps.google.com/maps?q=Balaghat&z=15&output=embed"; // fallback
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle-btn");

  toggleBtn.addEventListener("click", () => {
    const body = document.body;

    if (body.classList.contains("light-theme")) {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    } else {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    }
  });
});




// 
