document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality (reuse from main script)
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active")
      mobileMenu.classList.toggle("active")

      if (mobileMenuBtn.classList.contains("active")) {
        mobileMenuBtn.children[0].style.transform = "translateY(9px) rotate(45deg)"
        mobileMenuBtn.children[1].style.opacity = "0"
        mobileMenuBtn.children[2].style.transform = "translateY(-9px) rotate(-45deg)"
      } else {
        mobileMenuBtn.children[0].style.transform = "none"
        mobileMenuBtn.children[1].style.opacity = "1"
        mobileMenuBtn.children[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking a link
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu) {
        mobileMenu.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
        mobileMenuBtn.children[0].style.transform = "none"
        mobileMenuBtn.children[1].style.opacity = "1"
        mobileMenuBtn.children[2].style.transform = "none"
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }

    // Reveal animations on scroll
    revealElements()
  })

  // Initial reveal for elements in viewport
  revealElements()

  // Create floating particles
  createFloatingParticles()

  // Reseller card interactions
  const resellerCards = document.querySelectorAll(".reseller-card")
  const visitShopButtons = document.querySelectorAll(".visit-shop-btn")

  // Add hover effects to payment icons
  const paymentIcons = document.querySelectorAll(".payment-icon")
  paymentIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      const tooltip = icon.getAttribute("title")
      if (tooltip) {
        // Could add tooltip functionality here
      }
    })
  })

  // Visit shop button interactions
  visitShopButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // Get the reseller name from the card
      const resellerCard = button.closest(".reseller-card")
      const resellerName = resellerCard.querySelector("h3").textContent

      // Get the actual href from the button
      const shopUrl = button.getAttribute("href")

      console.log(`Visiting ${resellerName} shop at ${shopUrl}`) // Debug log

      // Check if it's a valid URL
      if (shopUrl && shopUrl !== "#" && shopUrl !== "") {
        // Open shop in new tab
        window.open(shopUrl, "_blank")
        showTemporaryMessage(`Opening ${resellerName} shop...`)
      } else {
        // Show coming soon message for placeholder links
        showTemporaryMessage(`${resellerName} shop coming soon...`)
      }
    })
  })

  // Logo interaction
  const resellersLogo = document.querySelector(".resellers-logo")
  if (resellersLogo) {
    resellersLogo.addEventListener("click", () => {
      resellersLogo.style.animation = "none"
      setTimeout(() => {
        resellersLogo.style.animation = "logoFloat 6s ease-in-out infinite"
      }, 100)

      // Add extra sparkles on click
      const sparkles = document.querySelectorAll(".sparkle")
      sparkles.forEach((sparkle, index) => {
        sparkle.style.animation = "none"
        setTimeout(() => {
          sparkle.style.animation = `sparkleAnimation 1s infinite`
          setTimeout(() => {
            sparkle.style.animation = `sparkleAnimation 3s infinite`
            sparkle.style.animationDelay = `${index * 0.8}s`
          }, 2000)
        }, index * 100)
      })
    })
  }

  // Show temporary message function
  function showTemporaryMessage(message) {
    // Create message element
    const messageEl = document.createElement("div")
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--gold-gradient);
      color: #000;
      padding: 15px 25px;
      border-radius: 30px;
      font-weight: 600;
      z-index: 10000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `
    messageEl.textContent = message
    document.body.appendChild(messageEl)

    // Animate in
    setTimeout(() => {
      messageEl.style.transform = "translateX(0)"
    }, 10)

    // Remove after 3 seconds
    setTimeout(() => {
      messageEl.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(messageEl)
      }, 300)
    }, 3000)
  }

  // Image upload functionality
  function setupImageUploads() {
    // Banner image uploads
    const bannerUploads = document.querySelectorAll('input[id$="-banner-upload"]')
    bannerUploads.forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const imageUrl = e.target.result
            const bannerId = input.id.replace("-upload", "")
            const bannerElement = document.getElementById(bannerId)

            if (bannerElement) {
              bannerElement.style.setProperty("--banner-image", `url(${imageUrl})`)
              bannerElement.classList.add("custom-banner")
              showTemporaryMessage("Banner image updated!")
            }
          }
          reader.readAsDataURL(file)
        }
      })
    })

    // Icon image uploads
    const iconUploads = document.querySelectorAll('input[id$="-icon-upload"]')
    iconUploads.forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const imageUrl = e.target.result
            const iconId = input.id.replace("-upload", "")
            const iconElement = document.getElementById(iconId)

            if (iconElement) {
              iconElement.style.setProperty("--icon-image", `url(${imageUrl})`)
              iconElement.classList.add("custom-icon")
              showTemporaryMessage("Icon image updated!")
            }
          }
          reader.readAsDataURL(file)
        }
      })
    })
  }

  // Initialize image uploads
  setupImageUploads()
})

// Create floating particles for enhanced background
function createFloatingParticles() {
  const particlesContainer = document.getElementById("particles")
  if (!particlesContainer) return

  const particleCount = 15

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random starting position
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 20 + "s"
    particle.style.animationDuration = Math.random() * 10 + 20 + "s"

    particlesContainer.appendChild(particle)
  }
}

// Reveal elements on scroll
function revealElements() {
  const revealTextElements = document.querySelectorAll(".reveal-text")
  const resellerCards = document.querySelectorAll(".reseller-card")
  const infoCards = document.querySelectorAll(".info-card")

  const windowHeight = window.innerHeight
  const revealPoint = 150

  // Reveal text elements
  revealTextElements.forEach((element) => {
    const revealTop = element.getBoundingClientRect().top
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("visible")
    }
  })

  // Reveal reseller cards with staggered animation
  resellerCards.forEach((card, index) => {
    const revealTop = card.getBoundingClientRect().top
    if (revealTop < windowHeight - revealPoint) {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 150)
    }
  })

  // Reveal info cards
  infoCards.forEach((card, index) => {
    const revealTop = card.getBoundingClientRect().top
    if (revealTop < windowHeight - revealPoint) {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    }
  })
}

// Add smooth parallax effect for background
window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight

  // Subtle movement for background pattern
  const bgPattern = document.querySelector(".bg-pattern")
  if (bgPattern) {
    bgPattern.style.transform = `translateX(${(x - 0.5) * -20}px) translateY(${(y - 0.5) * -20}px) rotate(5deg)`
  }
})
