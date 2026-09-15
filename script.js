```javascript
/* =====================================================
   MEDCARE PHARMACY
   CLEAN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------------------
       ELEMENTS
    ------------------------------------------------- */

    const medicineCards = document.querySelectorAll(".medicine-card");
    const categoryButtons = document.querySelectorAll(".category-card");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.getElementById("noResults");
    const resultText = document.getElementById("resultText");

    const modal = document.getElementById("medicineModal");
    const closeModalButton = document.getElementById("closeModal");

    const modalName = document.getElementById("modalName");
    const modalType = document.getElementById("modalType");
    const modalBenefit = document.getElementById("modalBenefit");
    const modalComposition = document.getElementById("modalComposition");

    const detailsButtons = document.querySelectorAll(".details-btn");

    const menuButton = document.getElementById("menuBtn");
    const navigation = document.getElementById("nav");


    /* -------------------------------------------------
       CURRENT FILTER
    ------------------------------------------------- */

    let selectedCategory = "all";


    /* -------------------------------------------------
       FILTER MEDICINES
    ------------------------------------------------- */

    function filterMedicines() {

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        let visibleCount = 0;

        medicineCards.forEach(function (card) {

            const category =
                card.getAttribute("data-category") || "";

            const name =
                card.getAttribute("data-name") || "";

            const searchableText =
                (
                    name + " " +
                    card.textContent
                ).toLowerCase();

            const categoryMatches =
                selectedCategory === "all" ||
                category === selectedCategory;

            const searchMatches =
                searchTerm === "" ||
                searchableText.includes(searchTerm);

            if (categoryMatches && searchMatches) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }
        });


        /* -------------------------------------------------
           NO RESULTS MESSAGE
        ------------------------------------------------- */

        if (noResults) {

            noResults.style.display =
                visibleCount === 0 ? "block" : "none";

        }


        /* -------------------------------------------------
           RESULT TEXT
        ------------------------------------------------- */

        if (resultText) {

            if (visibleCount === 0) {

                resultText.textContent =
                    "No products match your search.";

            } else if (selectedCategory === "all") {

                resultText.textContent =
                    visibleCount +
                    (visibleCount === 1
                        ? " product available"
                        : " products available");

            } else {

                resultText.textContent =
                    visibleCount +
                    (visibleCount === 1
                        ? " product in this category"
                        : " products in this category");
            }
        }
    }


    /* -------------------------------------------------
       CATEGORY BUTTONS
    ------------------------------------------------- */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory =
                button.getAttribute("data-category") || "all";

            filterMedicines();


            /* Scroll to medicine section */

            const medicineSection =
                document.getElementById("medicines");

            if (medicineSection) {

                medicineSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* -------------------------------------------------
       SEARCH
    ------------------------------------------------- */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterMedicines
        );
    }


    /* -------------------------------------------------
       OPEN MEDICINE MODAL
    ------------------------------------------------- */

    detailsButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name") ||
                "Medicine";

            const type =
                button.getAttribute("data-type") ||
                "Product";

            const benefit =
                button.getAttribute("data-benefit") ||
                "Please check the product packaging.";

            const composition =
                button.getAttribute("data-composition") ||
                "Please check the product packaging.";


            if (modalName) {
                modalName.textContent = name;
            }

            if (modalType) {
                modalType.textContent = type;
            }

            if (modalBenefit) {
                modalBenefit.textContent = benefit;
            }

            if (modalComposition) {
                modalComposition.textContent = composition;
            }


            if (modal) {

                modal.classList.add("show");

                document.body.classList.add("modal-open");
            }
        });
    });


    /* -------------------------------------------------
       CLOSE MODAL FUNCTION
    ------------------------------------------------- */

    function closeMedicineModal() {

        if (modal) {
            modal.classList.remove("show");
        }

        document.body.classList.remove("modal-open");
    }


    /* -------------------------------------------------
       CLOSE BUTTON
    ------------------------------------------------- */

    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeMedicineModal
        );
    }


    /* -------------------------------------------------
       CLICK OUTSIDE MODAL
    ------------------------------------------------- */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    closeMedicineModal();
                }
            }
        );
    }


    /* -------------------------------------------------
       ESCAPE KEY
    ------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeMedicineModal();
            }
        }
    );


    /* -------------------------------------------------
       MOBILE MENU
    ------------------------------------------------- */

    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle(
                    "mobile-open"
                );

            }
        );


        /* Close menu after selecting a link */

        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navigation.classList.remove(
                        "mobile-open"
                    );

                }
            );
        });
    }


    /* -------------------------------------------------
       INITIAL FILTER
    ------------------------------------------------- */

    filterMedicines();

});
```
