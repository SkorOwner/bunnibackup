document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header")
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")

  // Easter egg variables
  let logoClickCount = 0
  const heroLogo = document.querySelector(".hero-logo")

  // Mobile menu toggle
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

  // Easter egg functionality - FIXED
  if (heroLogo) {
    heroLogo.addEventListener("click", (e) => {
      e.preventDefault()
      logoClickCount++

      console.log(`Logo clicked ${logoClickCount} times`) // Debug log

      // Normal logo animation
      heroLogo.style.animation = "none"
      setTimeout(() => {
        heroLogo.style.animation = "logoFloat 6s ease-in-out infinite"
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

      // Easter egg trigger after 10 clicks
      if (logoClickCount >= 10) {
        console.log("Triggering easter egg!") // Debug log
        triggerEasterEgg()
        logoClickCount = 0 // Reset counter
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Platform tabs
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      button.classList.add("active")
      const platform = button.getAttribute("data-platform")
      const targetPane = document.querySelector(`.tab-pane[data-platform="${platform}"]`)
      if (targetPane) {
        targetPane.classList.add("active")
      }
    })
  })

  // Platform download buttons
  const platformDownloadButtons = document.querySelectorAll(".platform-download-button")

  platformDownloadButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      const platform = button.closest(".tab-pane").getAttribute("data-platform")

      if (platform === "android" || platform === "external") {
        // Disabled platforms - do nothing
        return
      } else if (platform === "windows") {
        // Show popup for Windows
        showDownloadPopup("windows")
      }
    })
  })

  // MacOS copy functionality - FIXED
  const macosCopyBtn = document.getElementById("macos-copy-btn")
  const macosInput = document.querySelector(".macos-script-input")

  if (macosCopyBtn && macosInput) {
    console.log("MacOS copy button found and event listener added") // Debug log

    macosCopyBtn.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("MacOS copy button clicked") // Debug log

      // Show TOS popup first
      showDownloadPopup("macos")
    })

    // MacOS input click functionality - same as copy button
    if (macosInput) {
      macosInput.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("MacOS input field clicked") // Debug log

        // Show TOS popup first (same as copy button)
        showDownloadPopup("macos")
      })

      // Also prevent text selection to force the popup flow
      macosInput.addEventListener("selectstart", (e) => {
        e.preventDefault()
      })

      macosInput.addEventListener("mousedown", (e) => {
        e.preventDefault()
        // Show TOS popup
        showDownloadPopup("macos")
      })
    }
  } else {
    console.log("MacOS copy button or input not found") // Debug log
  }

  // Disable Android and External download buttons
  const androidButton = document.querySelector('.tab-pane[data-platform="android"] .platform-download-button')
  const externalButton = document.querySelector('.tab-pane[data-platform="external"] .platform-download-button')

  if (androidButton) {
    androidButton.classList.add("disabled")
    androidButton.setAttribute("disabled", "true")
  }

  if (externalButton) {
    externalButton.classList.add("disabled")
    externalButton.setAttribute("disabled", "true")
  }

  // Discord member counter animation
  animateCounter("discord-members", 20000)
  animateCounter("discord-online", 3500)

  // Download popup functionality - FIXED
  function showDownloadPopup(platform = "windows") {
    console.log(`Showing download popup for platform: ${platform}`) // Debug log

    // Remove existing popup if it exists
    const existingPopup = document.querySelector(".download-popup")
    if (existingPopup) {
      existingPopup.remove()
    }

    // Create new popup
    const popup = document.createElement("div")
    popup.className = "download-popup"
    popup.innerHTML = `
      <div class="popup-content">
        <h3>Download Agreement</h3>
        <p>By downloading you agree to our <strong>Privacy Policy</strong> and <strong>Terms of Service</strong> seen in our <strong>Discord</strong>.</p>
        <div class="popup-buttons">
          <button class="popup-button agree">I Agree</button>
          <button class="popup-button disagree">I Don't Agree</button>
        </div>
      </div>
    `
    document.body.appendChild(popup)

    // Add event listeners
    const agreeBtn = popup.querySelector(".agree")
    const disagreeBtn = popup.querySelector(".disagree")

    agreeBtn.addEventListener("click", () => {
      console.log(`User agreed for platform: ${platform}`) // Debug log

      if (platform === "windows") {
        // Open download link in new tab
        window.open("https://realbunni.com/beta/download", "_blank")
        hideDownloadPopup()
      } else if (platform === "macos") {
        // Copy to clipboard and show installation instructions
        copyMacosScript()
        hideDownloadPopup()
        setTimeout(() => {
          showInstallationPopup()
        }, 300)
      }
    })

    disagreeBtn.addEventListener("click", () => {
      hideDownloadPopup()
    })

    // Close popup when clicking outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        hideDownloadPopup()
      }
    })

    // Show popup
    setTimeout(() => {
      popup.classList.add("active")
      document.body.style.overflow = "hidden"
    }, 10)
  }

  function hideDownloadPopup() {
    const popup = document.querySelector(".download-popup")
    if (popup) {
      popup.classList.remove("active")
      document.body.style.overflow = ""
      setTimeout(() => {
        popup.remove()
      }, 300)
    }
  }

  // MacOS copy script function - FIXED
  function copyMacosScript() {
    const macosInput = document.querySelector(".macos-script-input")
    const copyBtn = document.getElementById("macos-copy-btn")

    console.log("Copying MacOS script") // Debug log

    if (macosInput && copyBtn) {
      // Copy to clipboard
      navigator.clipboard
        .writeText(macosInput.value)
        .then(() => {
          console.log("Script copied successfully") // Debug log

          // Update button to show success
          copyBtn.classList.add("copied")
          copyBtn.innerHTML = '<i class="fas fa-check"></i>'

          setTimeout(() => {
            copyBtn.classList.remove("copied")
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>'
          }, 2000)
        })
        .catch(() => {
          console.log("Fallback copy method") // Debug log

          // Fallback for older browsers
          macosInput.select()
          document.execCommand("copy")

          copyBtn.classList.add("copied")
          copyBtn.innerHTML = '<i class="fas fa-check"></i>'

          setTimeout(() => {
            copyBtn.classList.remove("copied")
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>'
          }, 2000)
        })
    }
  }

  // Installation instructions popup - FIXED
  function showInstallationPopup() {
    console.log("Showing installation popup") // Debug log

    // Remove existing popup if it exists
    const existingPopup = document.querySelector(".installation-popup")
    if (existingPopup) {
      existingPopup.remove()
    }

    const popup = document.createElement("div")
    popup.className = "installation-popup"
    popup.innerHTML = `
      <div class="popup-content">
        <h3>MacOS Installation Instructions</h3>
        <div class="installation-steps">
          <ol>
            <li>Open <strong>Terminal</strong> (Press <code>Cmd + Space</code>, type "Terminal", press Enter)</li>
            <li>Paste the copied command and press <strong>Enter</strong></li>
            <li>If prompted, enter your password (characters won't show while typing)</li>
            <li>Wait for the installation to complete</li>
            <li>The application will be installed to <code>/Applications/bunni.lol.app</code></li>
            <li>You can now launch bunni.lol from your Applications folder</li>
          </ol>
          <p style="margin-top: 15px; color: var(--text-secondary);">
            <strong>Note:</strong> You may need to allow the app in System Preferences > Security & Privacy if macOS blocks it.
          </p>
        </div>
        <button class="close-button">Close</button>
      </div>
    `
    document.body.appendChild(popup)

    // Add close button listener
    const closeBtn = popup.querySelector(".close-button")
    closeBtn.addEventListener("click", () => {
      hideInstallationPopup()
    })

    // Close popup when clicking outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        hideInstallationPopup()
      }
    })

    // Show popup
    setTimeout(() => {
      popup.classList.add("active")
      document.body.style.overflow = "hidden"
    }, 10)
  }

  function hideInstallationPopup() {
    const popup = document.querySelector(".installation-popup")
    if (popup) {
      popup.classList.remove("active")
      document.body.style.overflow = ""
      setTimeout(() => {
        popup.remove()
      }, 300)
    }
  }

  // Easter egg functionality - FIXED
  function triggerEasterEgg() {
    console.log("Easter egg triggered!") // Debug log

    // Create and animate the bug
    const bug = document.createElement("div")
    bug.className = "easter-egg-bug"
    bug.innerHTML = '<i class="fas fa-bug"></i>'

    // Position bug behind the logo
    const logoContainer = document.querySelector(".hero-logo-container")
    const logoRect = logoContainer.getBoundingClientRect()

    bug.style.top = logoRect.top + logoRect.height / 2 + "px"
    bug.style.left = logoRect.left + logoRect.width / 2 + "px"

    document.body.appendChild(bug)

    // Animate bug crawling across screen
    bug.style.animation = "bugCrawl 3s ease-out forwards"

    // Remove bug after animation and show popup
    setTimeout(() => {
      bug.remove()
      showEasterEggPopup()
    }, 1000)
  }

  function showEasterEggPopup() {
    console.log("Showing easter egg popup") // Debug log

    // Remove existing popup if it exists
    const existingPopup = document.querySelector(".easter-egg-popup")
    if (existingPopup) {
      existingPopup.remove()
    }

    const popup = document.createElement("div")
    popup.className = "easter-egg-popup"
    popup.innerHTML = `
      <div class="popup-content">
        <h3>🎉 Wow! You found me!</h3>
        <p>You have won <strong>10% off</strong> our official shop!</p>
        <div class="popup-buttons">
          <button class="popup-button agree">Accept Discount</button>
          <button class="popup-button disagree">Decline</button>
        </div>
      </div>
    `
    document.body.appendChild(popup)

    // Add event listeners
    const acceptBtn = popup.querySelector(".agree")
    const declineBtn = popup.querySelector(".disagree")

    acceptBtn.addEventListener("click", () => {
      // Open shop in new tab
      window.open("https://buybunni.xyz/", "_blank")
      hideEasterEggPopup()
    })

    declineBtn.addEventListener("click", () => {
      hideEasterEggPopup()
    })

    // Close popup when clicking outside
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        hideEasterEggPopup()
      }
    })

    // Show popup
    setTimeout(() => {
      popup.classList.add("active")
      document.body.style.overflow = "hidden"
    }, 10)
  }

  function hideEasterEggPopup() {
    const popup = document.querySelector(".easter-egg-popup")
    if (popup) {
      popup.classList.remove("active")
      document.body.style.overflow = ""
      setTimeout(() => {
        popup.remove()
      }, 300)
    }
  }

  // ESC key to close popups
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideDownloadPopup()
      hideInstallationPopup()
      hideEasterEggPopup()
    }
  })
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
  const featureCards = document.querySelectorAll(".feature-card")

  const windowHeight = window.innerHeight
  const revealPoint = 150

  // Reveal text elements
  revealTextElements.forEach((element) => {
    const revealTop = element.getBoundingClientRect().top
    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("visible")
    }
  })

  // Reveal feature cards with delay
  featureCards.forEach((card) => {
    const revealTop = card.getBoundingClientRect().top
    if (revealTop < windowHeight - revealPoint) {
      setTimeout(
        () => {
          card.classList.add("visible")
        },
        Number.parseInt(card.getAttribute("data-delay")) || 0,
      )
    }
  })
}

// Animate counter
function animateCounter(id, target) {
  const element = document.getElementById(id)
  if (!element) return

  const duration = 2000 // 2 seconds
  const step = 30 // Update every 30ms
  const start = 0
  const increment = (target - start) / (duration / step)

  let current = start
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      clearInterval(timer)
      current = target
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, step)
}

// Add smooth parallax effect
window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight

  // Subtle movement for background pattern
  const bgPattern = document.querySelector(".bg-pattern")
  if (bgPattern) {
    bgPattern.style.transform = `translateX(${(x - 0.5) * -20}px) translateY(${(y - 0.5) * -20}px) rotate(5deg)`
  }
})
