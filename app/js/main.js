//btn click effect
$('.btn').on('click', function (e) {
    e.stopPropagation();

    const offset = $(this).offset();
    const x = e.pageX - offset.left;
    const y = e.pageY - offset.top;

    // console.log(`y:${y} -=- x:${x}`);
    $(this).children('.btn__circle').remove();
    $(this).append('<span class="btn__circle"></span>')
    $(this).children('.btn__circle').css('top', y + 'px').css('left', x + 'px')
})

// burger
$('.burger').click(function () {
    $('.nav').addClass('nav_active')
    $('body').addClass('no-scroll')
})
$('.nav__close').click( function () {
    $('.nav').removeClass('nav_active')
    $('body').removeClass('no-scroll')
})

//input
$('.input__field').val('');

$('.input__field').on('focusin', function (e) {
    const inputParent = $(this).parent().parent()
    const inputLabel = inputParent.children('.input__label')
    const inputError = inputParent.children('.input__error')

    inputParent.addClass('input_focus')
})
$('.input__field').on('focusout', function (e) {
    const inputParent = $(this).parent().parent()
    const inputLabel = inputParent.children('.input__label')
    const inputError = inputParent.children('.input__error')

    if (!$(this).val().length) {
        inputParent.removeClass('input_focus')
    }
})
$('.input__field').on('change', function (e) {

    const inputParent = $(this).parent().parent()
    const inputLabel = inputParent.children('.input__label')
    const inputError = inputParent.children('.input__error')

    if (!$(this).val().length) {
        inputParent.removeClass('input_focus')
    } else {
        inputParent.addClass('input_focus')
    }
})
$('.input-quantity').on('input', function () {
    const inputParent = $(this).parent().parent()
    const inputError = inputParent.children('.input__error')

    // const quantity = $(this).val().trim();
    const number = parseInt($(this).val())

    if (//!/[^\d]/.test(quantity) ||
        $(this).val() == '' ||
        (number > 0 && number < 11)) {
        // valid

        inputError.slideUp(200, function () {
            inputError.text('')
        })
    } else {
        console.log(2);
        // invalid
        inputError.text('Від 1 до 10')
        inputError.slideDown(200).stop()
    }
});
$('.input-phone').on('focusout', function () {

    const inputParent = $(this).parent().parent()
    const inputError = inputParent.children('.input__error')

    const phoneNumber = $(this).val().trim();

    const numericPhone = phoneNumber.replace(/\D/g, '');

    const phonePattern = /^\d{10}$/;

    if (phonePattern.test(numericPhone) || $(this).val() == '') {
        // Номер телефона валидный
        inputError.slideUp(200, function () {
            inputError.text('')
        })
    } else {
        // Номер телефона невалидный
        inputError.text('Не валідний номер телефону')
        inputError.slideDown(200)
    }
});

//review slider
$('.review__sliper').slick({
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 912,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                centerMode: true,
                slidesToShow: 1,
                centerPadding: '0'
                // adaptiveHeight: true,
            }
        }
    ]
});

//transport slider
$('.transport__slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
});

//pop up
$(document).ready(function () {
    $('.open-pop-up').on('click', function () {
        var anchor = $(this).attr('data-open-popup');

        openPopup(anchor);
    });

    function openPopup(anchor) {
        $('#' + anchor).fadeIn(100).css('display', 'grid');

        $('body').addClass('no-scroll');
    }

    $('.close-pop-up').on('click', function () {
        $('.pop-up').fadeOut(100)
        $('body').removeClass('no-scroll');
    })
});

//smooth scroll
$('.smooth-scroll').on('click', function (e) {
    const target = $(this).attr('href').split('#')[1];

    if ($('#' + target)) return;

    e.preventDefault()

    $('html, body').animate({
        scrollTop: $(target).offset().top
    }, 1000);
});

//datapicker
if (!isTouchDevice()) {
    $(document).ready(function () {
        $.datepicker.setDefaults($.datepicker.regional['uk']);

        if ($(".datePicker")) {
            $(".datePicker").datepicker();
        }
    })
} else {
    $(".datePicker").attr('type', 'date')
}

//cityPicker
$(document).ready(function () {
    // $.getJSON('cities.json', function (data) {
    //     console.log(data);

    //     $('.cityPicker').autocomplete({
    //         source: data
    //     });
    // })
    //     .done(function () {
    //         console.log('Данные успешно загружены');
    //     })
    //     .fail(function (jqxhr, textStatus, error) {
    //         console.error('Ошибка загрузки данных:', textStatus, error);
    //     });
    if ($('.cityPicker').length) {
        $('.cityPicker').autocomplete({
            source: function (request, response) {
                $.getJSON('cities.json', function (data) {
                    var filteredData = $.grep(data, function (item) {
                        return item.label.toLowerCase().indexOf(request.term.toLowerCase()) !== -1;
                    });

                    var categoryMap = {};
                    $.each(filteredData, function (index, item) {
                        if (item.category !== "") {
                            if (!categoryMap[item.category]) {
                                categoryMap[item.category] = [];
                            }
                            categoryMap[item.category].push(item);
                        }
                    });

                    var result = [];
                    $.each(categoryMap, function (category, items) {
                        result.push({
                            label: category,
                            items: items
                        });
                        result = result.concat(items);
                    });

                    response(result);
                });
            },
            select: function (event, ui) {
                if (ui.item.items) {
                    event.preventDefault();
                }
            },
            focus: function (event, ui) {
                if (ui.item.items) {
                    event.preventDefault();
                }
            },
            open: function (event, ui) {
                var menu = $(this).data('ui-autocomplete').menu;
                var items = menu.element.find('.ui-menu-item:has(.ui-menu-item-wrapper)');
                items.each(function () {
                    var item = $(this);
                    var itemData = item.data('ui-autocomplete-item');
                    if (itemData.items) {
                        item.addClass('ui-autocomplete-category');
                    }
                });
            },
            response: function (event, ui) {
                if (ui.content.length === 0) {
                    var noResult = { label: 'Нічого не знайдено', value: '' };
                    ui.content.push(noResult);
                }
            }
        })
            .autocomplete('instance')._renderItem = function (ul, item) {
                if (item.items) {
                    return $('<li class="ui-autocomplete-category">' + item.label + '</li>').appendTo(ul);
                } else {
                    return $('<li>').append('<div>' + item.label + '</div>').appendTo(ul);
                }
            };
    }
})

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

$('form>button[type="submit"]').on('click', function (e) {
    e.preventDefault();
})