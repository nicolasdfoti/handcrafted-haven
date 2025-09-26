# What can SCSS provide for us

## SCOPING

This is an example of the same code written in SCSS vs CSS to show how it makes CSS easier to read and write.

### CSS

```
.example-box p {
normal css styles here
}
.example-box a {
}
.example-box:before {
}
```

### SCSS

```
.example-box {
  p {
  normal css styles here
  }
  a {
  }
  // psuedo elements use an & sign in SCSS:
  &::before
}
```

Since all of this is written "scoped" into .example-box, this will be the same as the CSS above, but it's all contained in 1 nested class which makes it much easier to organize and read CSS.

## VARIABLES

in SCSS you define and reference variables with $ instead of --

### CSS

```
--color-variable: 255 255 255;

example-box {
color: var(--color-variable);
}
```

### SCSS

```
$color-variable: 255 255 255;

example-box {
color: $color-variable;
}
```

And many other useful features, but since CSS is valid SCSS can be as simple or complex as you'd like
DOCS
https://sass-lang.com/
