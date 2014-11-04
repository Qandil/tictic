(function ($) {

    "use strict";

    /* ==========================================================================
                            check document is ready, then
   ========================================================================== */

    $(document).ready(function () {

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

