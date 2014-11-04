
(function ($) {

    /* ==========================================================================
                                defining TicTic
   ========================================================================== */
    $.fn.tictic = function (options) {
        var $this = this;
        var $charts = [], $titles = [], $heart, $textsize, $countersize, $loaded = false;


        /* ==========================================================================
                         default values used when options is not set
        ========================================================================== */
        var defaults = {
            totalWeeks: 40,
            date: {
                year: 2014,
                month: 4,
                day: 29
            },
            charts: {
                disableAnimation: false,
                darkerColor: '#F57E9F', //#598DCC
                lighterColor: '#FFC1D4', //#83B7EF
                size: 200,
                bigchart: {
                    scaleColor: false,
                    lineCap: 'square',
                    lineWidth: 10
                },
                smallchart: {
                    scaleColor: false,
                    lineCap: 'square',
                    lineWidth: 3
                }
            },
            heart: {
                src: 'js/heart.png'
            }
        };


        /* ==========================================================================
                             get missing options from defaults
        ========================================================================== */
        var $options = $.extend(true, {}, defaults, options);


        /* ==========================================================================
                          main function which does the counting
        ========================================================================== */
		var startCounting = function() {
			var _today = new Date();
			var _thatday = new Date($options.date.year, $options.date.month - 1, $options.date.day, 0, 0, 0, 0);
			_thatday.setDate(_thatday.getDate() - 1);

			var _lastday = new Date($options.date.year, $options.date.month - 1, $options.date.day, 0, 0, 0, 0);
			_lastday.setDate(_thatday.getDate() + ($options.totalWeeks * 7))

			var diff = _today.getTime() - _thatday.getTime();

			var lastdiff = _lastday.getTime() - _today.getTime();
			var daysleft = Math.floor(lastdiff / (1000 * 60 * 60 * 24));

			var weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
			diff -= weeks * (1000 * 60 * 60 * 24 * 7);

			var days = Math.floor(diff / (1000 * 60 * 60 * 24));
			diff -= days * (1000 * 60 * 60 * 24);

			var hours = Math.floor(diff / (1000 * 60 * 60));
			diff -= hours * (1000 * 60 * 60);

			var mins = Math.floor(diff / (1000 * 60));
			diff -= mins * (1000 * 60);

			var seconds = Math.floor(diff / (1000));

			$charts[0].update(Math.floor(((weeks * 100) / $options.totalWeeks)));
			$titles[0].text(weeks);
			$charts[1].update(Math.floor(((days * 100) / 7)));
			$titles[1].text(days);
			$charts[2].update(Math.floor(((hours * 100) / 24)));
			$charts[3].update(Math.floor(((mins * 100) / 60)));
			$charts[4].update(Math.floor(((seconds * 100) / 60)));
			$titles[2].text('Only ' + daysleft + ' days to go!');

			if(!$loaded)
			{
			    if ($options.charts.disableAnimation) {
			        for (var i = 0; i < 5; i++) {
			            $charts[i].disableAnimation();
			        }
			    }
			    $loaded = true;
			}

		}


        /* ==========================================================================
                                controlling heart beat
        ========================================================================== */
		var beat = function () {

		    var s_size = 0.66 * $options.heart.size;
		    var m_size = 0.83 * $options.heart.size;
		    var s_resize = ($options.heart.size - s_size) / 2;
		    var m_resize = ($options.heart.size - m_size) / 2;

		    $heart.animate({
		        width: s_size,
		        fontSize: s_size - 4,
		        top: $options.heart.top + s_resize,
		        left: $options.heart.left + s_resize
		    }, 450, function () {
		        $heart.animate({
		            width: $options.heart.size,
		            fontSize: $options.heart.size - 4,
		            top: $options.heart.top,
		            left: $options.heart.left
		        }, 100, function () {
		            $heart.animate({
		                width: m_size,
		                fontSize: m_size - 4,
		                top: $options.heart.top + m_resize,
		                left: $options.heart.left + m_resize
		            }, 70, function () {
		                $heart.animate({
		                    width: $options.heart.size,
		                    fontSize: $options.heart.size - 4,
		                    top: $options.heart.top,
		                    left: $options.heart.left
		                }, 70, function () {
		                    beat();
		                });
		            });
		        });
		    });
		};


        /* ==========================================================================
                   initialization function, adds elements to container
        ========================================================================== */
		var initCounter = function () {

		    $options.charts.bigchart.barColor = $options.charts.darkerColor;
		    $options.charts.bigchart.size = $options.charts.size;
		    $options.charts.smallchart.barColor = $options.charts.lighterColor;

		    for (var i = 0; i < 5; i++) {
		        $charts[i] = $('<span class="chart-' + i + '"></span>');
		    }

		    for (var i = 0; i < 5; i++) {
		        var set = $('<div class="chart-set"></div>');
		        var chart = $('<div class="chart"></div>');

		        chart.css({
		            'top': '0',
		            'left': '0'
		        });

		        chart.append($charts[i]);
		        set.append(chart);
		        
		        $charts[i].easyPieChart($options.charts.bigchart);

		        if (i < 2) {
		            $titles[i] = $('<div class="chart-title"></div>');
		            $titles[i].css({
                        'color': $options.charts.smallchart.barColor
		            });
		            set.append($titles[i]);

		            $textsize = Math.floor($options.charts.bigchart.size * 0.1);
		            $countersize = Math.floor($options.charts.bigchart.size * 0.3);

		            $titles[i].css({
		                'padding-top': Math.floor(($options.charts.bigchart.size - $countersize - $textsize) / 2),
		                'font-size': $textsize,
                        'color': $options.charts.smallchart.barColor 
		            });

		            $titles[i].append('<span>' + (i === 0 ? 'weeks' : 'days') + '</span>');
		            var counter = $('<span class="count">0</span>');
		            $titles[i].prepend(counter);
		            $titles[i] = counter;

		            $titles[i].css({
		                'font-size': $countersize,
		                'color': $options.charts.bigchart.barColor
		            });
		        }

		        if (i !== 0) {
		            i++;
		            chart = $('<div class="chart"></div>');
		            chart.css({
		                'top': ($options.charts.bigchart.lineWidth + $options.charts.smallchart.lineWidth) + 'px',
		                'left': ($options.charts.bigchart.lineWidth + $options.charts.smallchart.lineWidth) + 'px'
		            });
		            chart.append($charts[i]);
		            set.append(chart);

		            $options.charts.smallchart.size = $options.charts.bigchart.size - (($options.charts.bigchart.lineWidth * 2) + ($options.charts.smallchart.lineWidth * 2));
		            $charts[i].easyPieChart($options.charts.smallchart);
		        }

                

		        if (i === 4) {
		            $heart = $('<i class="baby-heart fa fa-heart"></i>');

		            $options.heart.size = Math.floor($options.charts.bigchart.size * 0.50)
		            $options.heart.top = $options.heart.left = Math.floor(($options.charts.bigchart.size - $options.heart.size) / 2);
		            
		            $heart.css({
		                'width': $options.heart.size,
		                'font-size': $options.heart.size - 4,
		                'top': $options.heart.top,
		                'left': $options.heart.left,
		                'color': $options.charts.bigchart.barColor,
                        'text-align': 'center' 
		            });
		            set.append($heart);
		            beat();
		        }

		        set.css({
		            "width": $options.charts.bigchart.size,
		            "height": $options.charts.bigchart.size
		        });

		        $this.append(set);

		    }

		    $titles[2] = $('<div class="chart-summary"></div>').css({
		        'clear': 'both',
		        'color': $options.charts.darkerColor,
		        'font-size': $textsize,
		        'text-align': 'center'
		    });



		    $this.append($titles[2]);

		    for (var i = 0; i < 5; i++) {
		        $charts[i] = $charts[i].data('easyPieChart');
		    }

		    startCounting();
		    setInterval(startCounting, 1000);
		}
		


		initCounter();
	};
})(jQuery);
