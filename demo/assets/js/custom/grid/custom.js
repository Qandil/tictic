(function ($) {

    "use strict";

    /* ==========================================================================
                            check document is ready, then
   ========================================================================== */

    $(document).ready(function () {


        var $gridDiv = $('#ri-grid');

        // check if grid div exist
        if ($gridDiv.length) {

            // initiate gridrotator
            $gridDiv.gridrotator({
                rows: 5,
                columns: 8,
                //animType: 'fadeInOut',
                animSpeed: 1000,
                interval: 600,
                w1024: {
                    rows: 5,
                    columns: 6
                },
                w768: {
                    rows: 6,
                    columns: 4
                },
                w480: {
                    rows: 7,
                    columns: 4
                },
                w320: {
                    rows: 8,
                    columns: 4
                },
                w240: {
                    rows: 8,
                    columns: 3
                }
            });
        }

        var $defaulteCounter = $(".counter");

        if ($defaulteCounter.length) {
            //enter the last menstrual period date using the date format  year, month, day
            $defaulteCounter.tictic({
                date: {
                    year: 2014,
                    month: 4,
                    day: 29
                },
                charts: {
                    disableAnimation: false
                }
            });
        }


    });

})(window.jQuery);

