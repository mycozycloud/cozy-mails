BaseView = require 'lib/base_view'

class exports.Menu extends BaseView
    id: 'menu_container'
    template: require 'templates/menu'

    select : (activeid) ->
        @$(".menu-option").removeClass "active"
        @$("##{activeid}").addClass "active"
