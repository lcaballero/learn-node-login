angular.module("SlideOutMenu").directive("slideOutMenu", function() {

    return {
        restrict    : 'A',
        templateUrl : 'slide-out-menu',
        transclude  : true,
        scope       : {},
        link        : function(scope, el, attrs) {

            scope.icon = attrs.slideOutMenuIcon;
            scope.menu = [
                { name: 'Chain List',   setting: 'chain-list',      icon: 'list' },
                { name: 'New Chain',    setting: 'new-chain',       icon: 'newtab' },
                { name: 'Stats',        setting: 'stats',           icon: 'stats' },
                { name: 'Achievements', setting: 'achievements',    icon: 'shield' },
                { name: 'Settings',     setting: 'settings',        icon: 'cog2' }
            ];

            scope.triggerMenu = function( setting ) {
                console.log(setting);
                console.log(el);
            };

            var isOpen = false;
            var icon = el[0].firstElementChild.firstElementChild
            var slideContent = icon.nextElementSibling;
            slideContent.style.display = 'none';

            scope.showMenu = function(ev) {

                var src = ev.srcElement;
                var p = src.parentNode;

                isOpen = !isOpen;

                if (isOpen) {
                    src.style.left = "250px";
                    p.style.height = "480px";
                    p.style.width = '285px';
                    slideContent.style.display = 'block';
                    el.removeClass('closed').addClass('open');
                } else {
                    src.style.left = "0px";
                    p.style.height = "33px";
                    p.style.width = '33px';
                    el.addClass('closed').removeClass('open');
                }
            };

            angular.element(icon).bind('transitionend', function() {
                console.log(slideContent);
                if (isOpen) {
                    el.addClass('shadowed');
                }
            })

            angular.element(slideContent).bind(
                'transitionend', function() {
                    if (!isOpen) {
                        slideContent.style.display = 'none';
                        el.removeClass('shadowed');
                    }
                });
        }
    };

});