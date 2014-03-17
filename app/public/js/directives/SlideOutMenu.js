angular.module("SlideOutMenu").directive("slideOutMenu", function() {

    return {
        restrict    : 'A',
        templateUrl : 'slide-out-menu',
        transclude  : true,
        scope       : {},
        link        : function(scope, el, attrs) {

            console.log(el);

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
            };

            var isOpen = false;
            var content = null;

            scope.showMenu = function(ev) {

                var src = ev.srcElement;
                var p = src.parentNode;
                var ct = src.nextElementSibling;
                content = ct;

                isOpen = !isOpen;

                if (isOpen) {
                    src.style.left = "250px";
                    p.style.height = "480px";
                    p.style.width = '285px';
                    ct.style.display = 'block';
                    ct.className = 'slide-content open';
                } else {
                    src.style.left = "0px";
                    p.style.height = "33px";
                    p.style.width = '33px';
                    ct.className = 'slide-content closed';
                }
            };

            console.log('fec1', el[0].firstElementChild);
            console.log('fec2', el[0].firstElementChild.firstElementChild);
            console.log('fec3', el[0].firstElementChild.firstElementChild.nextElementSibling);

            angular.element(el[0].firstElementChild.firstElementChild.nextElementSibling).bind(
                'transitionend', function() {
                    console.log('transition end');
                    if (!isOpen && !!content) {
                        console.log('transition end - adding none');
                        content.style.display = 'none'
                    }
                });
        }
    };

});