/* ==================================================
   CURSOR FOLLOWING EFFECT
================================================== */

const glow =
    document.querySelector(".cursor-glow");

const dot =
    document.querySelector(".cursor-dot");


document.addEventListener(
    "mousemove",
    function(event) {

        const mouseX =
            event.clientX;

        const mouseY =
            event.clientY;


        /* ==============================
           BLUE CURSOR GLOW
        ============================== */

        if (glow) {

            glow.style.left =
                `${mouseX}px`;

            glow.style.top =
                `${mouseY}px`;

        }


        /* ==============================
           SMALL CURSOR DOT
        ============================== */

        if (dot) {

            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }


        /* ==============================
           INTERACTIVE CARD MOVEMENT
        ============================== */

        document
            .querySelectorAll(".tilt-card")
            .forEach(card => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    ((mouseX - rect.left)
                    / rect.width) * 100;


                const y =
                    ((mouseY - rect.top)
                    / rect.height) * 100;


                /* ==============================
                   CURSOR IS INSIDE CARD
                ============================== */

                if (
                    x >= 0 &&
                    x <= 100 &&
                    y >= 0 &&
                    y <= 100
                ) {

                    card.style.setProperty(
                        "--mx",
                        `${x}%`
                    );


                    card.style.setProperty(
                        "--my",
                        `${y}%`
                    );


                    /* ==============================
                       CARD TILT
                    ============================== */

                    const rotateX =
                        (50 - y) / 18;


                    const rotateY =
                        (x - 50) / 18;


                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }


                /* ==============================
                   RESET CARD
                ============================== */

                else {

                    card.style.transform = "";

                }

            });

    }
);


/* ==================================================
   SCROLL REVEAL
================================================== */

const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        element => {

            observer.observe(element);

        }
    );


/* ==================================================
   CARD MOUSE LEAVE
================================================== */

document
    .querySelectorAll(".tilt-card")
    .forEach(card => {

        card.addEventListener(
            "mouseleave",
            function() {

                card.style.transform = "";

            }
        );

    });