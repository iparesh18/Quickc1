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

    result.innerHTML = `<span style="
  color: #656363;
  ">🧠 Thinking... analyzing your symptoms...</span>`;
  
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




// form


// Submit Review Form Handler
document.getElementById("review-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("review-text").value.trim();

  if (!name || !text) {
    alert("⚠️ Please fill out all fields.");
    return;
  }

  try {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, text })
    });

    if (res.ok) {
      alert("✅ Review submitted!");
      document.getElementById("review-form").reset();
      loadReviews(); // Refresh the list
    } else {
      const error = await res.json();
      alert("❌ Error: " + (error?.error || "Unable to submit review."));
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    alert("❌ Something went wrong!");
  }
});

// Format ISO Date
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Load Reviews
async function loadReviews() {
  try {
    const res = await fetch("/api/reviews");

    if (!res.ok) {
      throw new Error("Failed to fetch reviews.");
    }

    const reviews = await res.json();
    const container = document.getElementById("review-slider");
    container.innerHTML = "";

    reviews.reverse().forEach(review => {
      const createdAt = new Date(review.created_at);
      const formattedDate = createdAt.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `
        <strong>${review.name}</strong>
        <p>${review.text}</p>
        <small style="color:#ccc;font-size:12px;display:block;margin-top:10px;">🕒 ${formattedDate}</small>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading reviews:", err);
  }
}

// Initial Load
loadReviews();


// Pet 
async function checkAnimalSymptoms() {
  const symptoms = document.getElementById('pet-symptoms').value;
  const responseDiv = document.getElementById('pet-response');

  // Show spinner
  responseDiv.innerHTML = `<div class="spinner"></div>`;

  try {
      const res = await fetch('/api/vet', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
        
          },
          body: JSON.stringify({
              model: "mistralai/mistral-7b-instruct",
              messages: [
                  { role: "system", content: "You are a helpful veterinary assistant." },
                  { role: "user", content: `What could be the issue if an animal shows these symptoms: ${symptoms}` }
              ]
          })
      });

      const data = await res.json();
      const reply = data.choices[0].message.content;

      const formattedReply =
          "<ul>" +
          reply
            .replace(/^## (.*?)$/gm, "<h3>$1</h3>")
            .replace(/^\* \*\*(.*?)\*\*: (.*?)$/gm, "<li><strong>$1:</strong> $2</li>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/• /g, "<li>")
            .replace(/\n{2,}/g, "</ul><br><ul>")
            .replace(/\n/g, "")
            .replace(/<ul><\/ul>/g, "") +
          "</ul>";

      const disclaimer = `
          <br>
          <strong style="color: red;">🐾 Note:</strong> 
          <span style="color: #fff; font-weight:200;">
              This is a preliminary suggestion and not a substitute for professional veterinary advice. Always consult a licensed vet for accurate diagnosis.
          </span>
      `;

      responseDiv.innerHTML = formattedReply + disclaimer;

  } catch (error) {
      responseDiv.innerHTML = "Something went wrong. Please try again.";
      console.error(error);
  }
}


function findVetNearMe() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Redirect to Google Maps with vet search near the user's location
        const query = `https://www.google.com/maps?q=vets+near+me&ll=${lat},${lng}&z=15`;
        window.open(query, "_blank"); // Open in a new tab
      },
      (error) => {
        alert("Unable to retrieve your location. Showing a default location.");
        const fallbackLocation = "Balaghat"; // Default fallback location
        const query = `https://www.google.com/maps?q=vets+near+me&near=${fallbackLocation}`;
        window.open(query, "_blank"); // Open in a new tab
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
}