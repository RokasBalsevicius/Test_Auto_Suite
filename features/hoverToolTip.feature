Feature: Hover and ToolTip functionality test 

    Scenario: As a user, I am able to hover on an object and see the tooltip displayed

        Given User starts at the page to test hovering and ToolTips
        When User hovers on "Hover me to see" button
        Then User can see a ToolTip for hovered button with text inside
        When User hovers on "Contrary" hypertext
        Then User can see a ToolTip for hovered hypertext "Contrary" with text inside
        When User hovers on "1.10.32" hypertext
        Then User can see a ToolTip for hovered hypertext "1.10.32" with text inside