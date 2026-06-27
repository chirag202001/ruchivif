/* 
  Dr. Rama Sofat Hospital & Ruchi Test Tube Baby Centre
  Redesign JavaScript (Vanilla JS)
*/

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initServiceTabs();
  initServiceModal();
  initCostEstimator();
  initTestimonialSlider();
  initAppointmentManager();
  initFaqAccordion();
});

/* ==========================================================================
   Navbar & Navigation Scripts
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Shrink navbar on scroll & toggle back-to-top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shrink');
      backToTop.classList.add('active');
    } else {
      navbar.classList.remove('shrink');
      backToTop.classList.remove('active');
    }
    
    // Highlight nav link based on scroll position
    let currentSection = 'hero';
    const scrollPos = window.scrollY + 120; // offset for sticky navbar
    
    const sections = ['hero', 'about', 'services', 'doctors', 'estimator', 'testimonials', 'faq', 'contact', 'appointment'];
    sections.forEach(secId => {
      const element = document.getElementById(secId);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = secId;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const toggleIcon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      toggleIcon.className = 'fa-solid fa-xmark';
    } else {
      toggleIcon.className = 'fa-solid fa-bars';
    }
  });

  // Navigation Links Click Events
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if active
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').className = 'fa-solid fa-bars';

        // Smooth scroll to target
        const offset = 80; // navbar height compensation
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Logo Link click scrolls to top
  document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   Service Tab Filtering
   ========================================================================== */
function initServiceTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from other buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      // Filter cards
      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        
        // Hide with transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            // Trigger reflow to animate
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
          }
        }, 150);
      });
    });
  });
}

/* ==========================================================================
   Services Details Modal Logic
   ========================================================================== */
const serviceDetailsData = {
  ivf: {
    title: "In Vitro Fertilization (IVF)",
    subtitle: "Turn Parenthhood Dreams Into Reality",
    description: "In Vitro Fertilization, commonly referred to as the Test Tube Baby treatment, is one of the most widely recognized assisted reproductive technologies (ART) in the world. It provides highly reliable success pathways for couples facing complex infertility issues.",
    bullets: [
      "Ovarian Stimulation & Monitoring",
      "Safe Ultrasound-Guided Egg Retrieval",
      "Fertilization in Embryology Lab",
      "Advanced Blastocyst Incubation",
      "Highly Successful Embryo Transfer",
      "Cryopreservation of Extra Embryos"
    ],
    procedure: "The procedure involves stimulating the ovaries to produce multiple eggs, retrieving the eggs under mild sedation, fertilizing them in our laboratory with sperm, culturing the embryos, and carefully transferring the highest quality embryos back to the womb."
  },
  icsi: {
    title: "Intracytoplasmic Sperm Injection (ICSI)",
    subtitle: "Overcome Critical Male Infertility",
    description: "ICSI is a specialized form of IVF used primarily to treat severe cases of male infertility. Instead of mixing sperm and egg in a dish, a single selected high-quality sperm is directly injected into the cytoplasm of the egg.",
    bullets: [
      "Addresses Low Sperm Count (<5 Million/ml)",
      "Helps Poor Sperm Motility & Shape",
      "Recommended for previous IVF failures",
      "Uses high-magnification manipulators",
      "Enhances fertilization probabilities",
      "Compatible with testicular sperm extraction"
    ],
    procedure: "After mature eggs are collected, our embryologist uses a specialized micro-manipulator tool to hold a single egg, select the healthiest sperm, and inject it directly into the egg, bypassing any natural binding barriers."
  },
  laparoscopy: {
    title: "Advanced Laparoscopic Surgery",
    subtitle: "Minimally Invasive Diagnostic & Corrective Surgery",
    description: "Laparoscopy (keyhole surgery) allows our surgeons to view and operate inside your abdominal cavity through tiny, 5-10mm incisions. This ensures minimal pain, rapid healing, and immediate correction of underlaying fertility barriers.",
    bullets: [
      "Treats ovarian cysts & fibroids",
      "Corrects endometriosis lesions",
      "Diagnoses & opens blocked fallopian tubes",
      "Minimal postoperative pain",
      "Fast recovery (same day discharge)",
      "Reduces adhesion formation risk"
    ],
    procedure: "A thin lighted scope (laparoscope) is passed through a tiny belly button incision. Using modern video monitors, our surgeons operate with precise micro-instruments to treat anomalies affecting reproductive organs."
  },
  hysteroscopy: {
    title: "Hysteroscopic Surgery",
    subtitle: "Direct Examination of the Uterine Cavity",
    description: "Hysteroscopy is a crucial diagnostic and therapeutic procedure that involves introducing a narrow, lighted lens through the cervix directly into the uterine cavity. It does not require any surgical incisions on the skin.",
    bullets: [
      "Identifies and removes uterine polyps",
      "Resects uterine septum (congenital issues)",
      "Resolves intrauterine scarring/adhesions",
      "Corrects shape prior to IVF transfer",
      "Performed as a day-care procedure",
      "No external scars or incisions"
    ],
    procedure: "Under light anesthesia, the hysteroscope is introduced through the vagina and cervix. Carbon dioxide or a safe fluid is used to expand the cavity, allowing detailed examination and immediate surgical correction."
  },
  male_infertility: {
    title: "Male Infertility & Sexual Dysfunction Care",
    subtitle: "Comprehensive Reproductive Health for Men",
    description: "Infertility affects both partners equally. We offer a dedicated, sensitive space for men to evaluate semen parameters, hormonal balances, and treat underlaying erectile, ejaculatory, or structural abnormalities.",
    bullets: [
      "Advanced Semen Analysis",
      "Erectile & Ejaculatory Dysfunction care",
      "Hormonal panel evaluations",
      "Varicocele diagnostic assessments",
      "Semen cryopreservation services",
      "Lifestyle and medical management plans"
    ],
    procedure: "We conduct detailed sperm count, morphology, and motility diagnostics. We then outline target medical therapy, surgical options (like varicocelectomy), or formulate ICSI cycles using sperm banking support."
  },
  rpl: {
    title: "Recurrent Pregnancy Loss (RPL) Clinic",
    subtitle: "Hope After Loss - Specialized Diagnostic Care",
    description: "Losing a pregnancy is emotionally exhausting. Couples experiencing two or more consecutive miscarriages require a targeted diagnostic workup to identify and correct hormonal, anatomical, or genetic anomalies.",
    bullets: [
      "Detailed anatomical screening",
      "Genetic karyotyping for both partners",
      "Autoimmune & Antiphospholipid workups",
      "PGS/PGD genetic embryo selection",
      "Luteal phase hormonal corrections",
      "Close early-pregnancy monitoring"
    ],
    procedure: "We map out potential triggers: uterine anomalies, hormonal imbalances, blood clotting factors, or chromosomal errors. We construct corrective pathways, including genetic IVF or pharmacological support during early gestation."
  },
  aesthetic_gynae: {
    title: "Aesthetic Gynecology Clinic",
    subtitle: "Intimate Wellness and Rejuvenation",
    description: "A modern branch of medicine designed to address muscle laxity, functional discomfort, or visual changes in intimate body parts due to childbirth, aging, or hormonal shifts.",
    bullets: [
      "Hymenoplasty (restoration surgery)",
      "Vaginal tightening & rejuvenation",
      "Corrects post-delivery pelvic sagging",
      "Non-surgical pelvic floor therapy",
      "Improves functional physical comfort",
      "Boosts personal confidence & wellness"
    ],
    procedure: "We leverage gentle, state-of-the-art clinical devices (laser/RF) or localized outpatient surgical procedures to reconstruct, tighten, and restore tone to pelvic structures."
  },
  urogynae: {
    title: "Urogynaecology Clinic",
    subtitle: "Solving Pelvic Floor & Urinary Leak Concerns",
    description: "Pelvic floor disorders can cause leakage during coughing, laughing, or feelings of pelvic pressure. Our dedicated clinic provides surgical and non-surgical solutions to help women regain control and confidence.",
    bullets: [
      "Treats Stress Urinary Incontinence (SUI)",
      "Manages Uterine and Bladder Prolapse",
      "Pelvic floor muscle rehabilitation",
      "Urodynamic diagnostic parameters",
      "Sling procedures (TVT/TOT tapes)",
      "Conservative ring pessary fittings"
    ],
    procedure: "We evaluate the support mechanisms of your bladder, uterus, and bowel. Treatments range from physical therapy guidelines to advanced minimally-invasive mesh sling surgeries that restore anatomical support."
  },
  gynae_cancer: {
    title: "Gynae Cancer Clinic",
    subtitle: "Screening, Prevention & Surgical Oncology",
    description: "Early diagnosis is key to overcoming gynecological cancers. We offer structured screening procedures, diagnostic biopsies, and specialized surgical management for uterine, cervical, ovarian, and vulvar malignancies.",
    bullets: [
      "Pap Smear & HPV DNA testing",
      "Cervical Cancer vaccination advice",
      "Ovarian tumor marker screening (CA-125)",
      "Colposcopy and endometrial biopsy",
      "Complex gynecological tumor surgeries",
      "Post-operative oncology guidance"
    ],
    procedure: "We run standard screenings in-house. If anomalies are identified, we perform detailed imaging, colposcopy, or biopsy, and perform specialized surgeries (e.g. hysterectomy) following strict oncological boundaries."
  }
};

function initServiceModal() {
  window.openServiceDetail = function(serviceKey) {
    const modal = document.getElementById('serviceModal');
    const content = document.getElementById('modalContent');
    const data = serviceDetailsData[serviceKey];

    if (!data) return;

    // Generate Bullets HTML
    const bulletsHtml = data.bullets.map(bullet => `
      <li><i class="fa-solid fa-circle-check"></i> ${bullet}</li>
    `).join('');

    content.innerHTML = `
      <h3>${data.title}</h3>
      <div class="modal-subtitle">${data.subtitle}</div>
      <p>${data.description}</p>
      <p><strong>Treatment Procedure:</strong> ${data.procedure}</p>
      <hr style="border:none; border-top: 1px solid var(--border-light); margin: 20px 0;">
      <h4 style="margin-bottom:12px; color: var(--primary-dark);">Key Features Included:</h4>
      <ul>
        ${bulletsHtml}
      </ul>
      <div style="margin-top: 30px; display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="closeServiceModal()" style="padding:10px 20px; font-size:0.85rem;">Close</button>
        <button class="btn btn-primary" onclick="closeServiceModal(); document.getElementById('appointment').scrollIntoView({behavior: 'smooth'})" style="padding:10px 20px; font-size:0.85rem;">Book Consultation</button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  window.closeServiceModal = function() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock background scroll
  };

  // Close modal when clicking overlay background
  document.getElementById('serviceModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('serviceModal')) {
      closeServiceModal();
    }
  });
}

/* ==========================================================================
   IVF Cost Estimator Calculations
   ========================================================================== */
function initCostEstimator() {
  const optCycle = document.querySelectorAll('#optCycle .est-option');
  const optLab = document.querySelectorAll('#optLab .est-option');
  const optMeds = document.querySelectorAll('#optMeds .est-option');
  const priceOutput = document.getElementById('priceOutput');
  const pkgInclusion = document.getElementById('pkgInclusion');

  // Option selection logic
  function setupOptionsGroup(elements) {
    elements.forEach(opt => {
      opt.addEventListener('click', () => {
        elements.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        calculateIVFCost();
      });
    });
  }

  setupOptionsGroup(optCycle);
  setupOptionsGroup(optLab);
  setupOptionsGroup(optMeds);

  function calculateIVFCost() {
    const selectedCycle = document.querySelector('#optCycle .active').getAttribute('data-val');
    const selectedLab = document.querySelector('#optLab .active').getAttribute('data-val');
    const selectedMeds = document.querySelector('#optMeds .active').getAttribute('data-val');

    let baseMin = 0;
    let baseMax = 0;
    let inclusions = [];

    // 1. Cycle base
    if (selectedCycle === 'standard_ivf') {
      baseMin += 80000;
      baseMax += 90000;
      inclusions.push("Standard IVF lab culturing");
    } else if (selectedCycle === 'icsi') {
      baseMin += 105000;
      baseMax += 115000;
      inclusions.push("ICSI single-sperm micromanipulator injection");
    }

    // 2. Lab advancements
    if (selectedLab === 'pgs') {
      baseMin += 45000;
      baseMax += 55000;
      inclusions.push("Blastocyst culturing & PGS/PGD biopsy");
    } else {
      inclusions.push("Standard incubator monitoring");
    }

    // 3. Meds tier
    if (selectedMeds === 'imported') {
      baseMin += 60000;
      baseMax += 75000;
      inclusions.push("Imported Recombinant stimulations");
    } else {
      baseMin += 30000;
      baseMax += 38000;
      inclusions.push("Standard Indian stimulations");
    }

    // Format output currency (INR)
    const formattedMin = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(baseMin);
    const formattedMax = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(baseMax);

    priceOutput.textContent = `${formattedMin} - ${formattedMax}`;
    pkgInclusion.innerHTML = `<i class="fa-solid fa-circle-check"></i> Includes: Consulting, scan monitors, retrieval, ${inclusions.join(', ')} & transfer.`;
  }

  // Initial calculation
  calculateIVFCost();
}

/* ==========================================================================
   Testimonial Slider Carousel
   ========================================================================== */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  let currentIdx = 0;
  let autoPlayTimer;

  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    // Handle index bounds
    if (index >= slides.length) {
      currentIdx = 0;
    } else if (index < 0) {
      currentIdx = slides.length - 1;
    } else {
      currentIdx = index;
    }

    slides[currentIdx].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentIdx + 1);
    resetAutoPlay();
  }

  function prevSlide() {
    showSlide(currentIdx - 1);
    resetAutoPlay();
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Auto-play setup
  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      showSlide(currentIdx + 1);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  startAutoPlay();
}

/* ==========================================================================
   Interactive Appointment Manager & Local Dashboard
   ========================================================================== */
function initAppointmentManager() {
  const form = document.getElementById('apptForm');
  const dashboard = document.getElementById('apptDashboard');
  const apptsList = document.getElementById('appointmentsList');

  // Prepopulate initial mockup appointments to show design functionality
  const mockupKey = 'ramasofat_appointments';
  let appointments = JSON.parse(localStorage.getItem(mockupKey)) || [];

  if (appointments.length === 0) {
    // Seed with two demo appointments
    appointments = [
      {
        name: "Amanpreet Kaur",
        phone: "+91 98765-43210",
        doctor: "Dr. Rama Sofat",
        service: "IVF Evaluation",
        date: "2026-07-02",
        status: "Confirmed"
      },
      {
        name: "Sonia Sharma",
        phone: "+91 98888-12345",
        doctor: "Dr. Amit Sofat",
        service: "Laparoscopy Surgery",
        date: "2026-07-05",
        status: "Awaiting Confirmation"
      }
    ];
    localStorage.setItem(mockupKey, JSON.stringify(appointments));
  }

  // Render list on load
  renderAppointments();

  window.handleFormSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('pName').value.trim();
    const phone = document.getElementById('pPhone').value.trim();
    const email = document.getElementById('pEmail').value.trim();
    const date = document.getElementById('apptDate').value;
    const doctor = document.getElementById('selDoctor').value;
    const service = document.getElementById('selService').value;
    const notes = document.getElementById('pNotes').value.trim();

    if (!name || !phone || !date) {
      alert("Please complete the required fields.");
      return;
    }

    // Create appointment object
    const newAppt = {
      name,
      phone,
      email,
      doctor,
      service,
      date,
      notes,
      status: "Confirmed (Online Requested)"
    };

    // Save to local list
    appointments.push(newAppt);
    localStorage.setItem(mockupKey, JSON.stringify(appointments));

    // Reset Form
    form.reset();

    // Show nice confirmation alert and render list
    alert(`Thank you, ${name}! Your slot request with ${doctor} for ${service} has been mock-saved. It is tracked on your session dashboard below.`);
    
    renderAppointments();
    
    // Scroll dashboard into view
    dashboard.scrollIntoView({ behavior: 'smooth' });
  };

  window.clearAppointments = function() {
    if (confirm("Are you sure you want to clear your local appointments?")) {
      appointments = [];
      localStorage.setItem(mockupKey, JSON.stringify(appointments));
      renderAppointments();
    }
  };

  function renderAppointments() {
    apptsList.innerHTML = '';
    
    if (appointments.length === 0) {
      dashboard.style.display = 'none';
      return;
    }

    dashboard.style.display = 'block';

    appointments.forEach(appt => {
      const card = document.createElement('div');
      card.className = 'appt-card';
      
      // format date
      const dateParts = appt.date.split('-');
      const formattedDate = dateParts.length === 3 ? `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : appt.date;

      card.innerHTML = `
        <div class="appt-info-main">
          <h5>${appt.name} - <span style="color: var(--secondary); font-weight: 600;">${appt.service}</span></h5>
          <p><i class="fa-solid fa-user-doctor"></i> Consultant: ${appt.doctor} | <i class="fa-solid fa-calendar-days"></i> Date: ${formattedDate} | <i class="fa-solid fa-phone"></i> Contact: ${appt.phone}</p>
        </div>
        <span class="appt-status">${appt.status}</span>
      `;
      
      apptsList.appendChild(card);
    });
  }
}

/* ==========================================================================
   FAQ / Educational Accordion Toggle
   ========================================================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-icon i').className = 'fa-solid fa-plus';
      });

      // If clicked item was not active, open it
      if (!isActive) {
        item.classList.add('active');
        header.querySelector('.faq-icon i').className = 'fa-solid fa-minus';
      }
    });
  });
}
