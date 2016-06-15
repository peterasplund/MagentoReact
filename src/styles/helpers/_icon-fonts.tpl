// ============
//  ICON FONTS
// ============

/*
  [*] Base rules for icon fonts.

  <%= editWarning %>
*/

@if (config("importIconFonts")) {
  @font-face {
    font-family: "<%= fontName %>";
    src: url("<%= fontPath %><%= fontName %>.eot?@@milliseconds");
    src: url("<%= fontPath %><%= fontName %>.eot?@@milliseconds#iefix") format("eot"),
         url("<%= fontPath %><%= fontName %>.woff?@@milliseconds") format("woff"),
         url("<%= fontPath %><%= fontName %>.ttf?@@milliseconds") format("truetype"),
         url("<%= fontPath %><%= fontName %>.svg?@@milliseconds#<%= fontName %>") format("svg");
    font-weight: normal;
    font-style:  normal;
  }

  %icon-font {
    display: inline-block;
    width: 1em;

    font-family: "<%= fontName %>";
    font-style:   normal;
    font-weight:  normal;
    font-variant: normal;

    speak: none;
    text-transform: none;
    text-decoration: inherit;
    text-align: center;

     -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  [class*="<%= className %>--"] {
    display: inline-block;

    &:before {
      @extend %icon-font;
    }
  }

  .<%= className %> {
    &--small {
      font-size: font("size--small");
      top: .1em;
    }
  }

  <% _.each(glyphs, function(glyph) { %>.<%= className %>--<%= glyph.name %>:before { content: "\<%= glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() %>" }
  <% }); %>
}
