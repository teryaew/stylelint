# selector-list-comma-newline-after

Require a newline or disallow whitespace after the commas of selector lists.

```css
    a,
    b↑{ color: pink; }
/**  ↑
 * The newline after this comma */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline after the commas.

The following patterns are considered warnings:

```css
a, b { color: pink; }
```

```css
a
, b { color: pink; }
```

The following patterns are *not* considered warnings:

```css
a,
b { color: pink; }
```

```css
a
,
b { color: pink; }
```

### `"always-multi-line"`

There *must always* be a newline after the commas in multi-line selector lists.

The following patterns are considered warnings:

```css
a
, b { color: pink; }
```

The following patterns are *not* considered warnings:

```css
a, b { color: pink; }
```

```css
a,
b { color: pink; }
```

```css
a
,
b { color: pink; }
```

### `"never-multi-line"`

There *must never* be whitespace after the commas in multi-line selector lists.

The following patterns are considered warnings:

```css
a
, b { color: pink; }
```

```css
a,
b { color: pink; }
```

The following patterns are *not* considered warnings:

```css
a,b { color: pink; }
```

```css
a
,b { color: pink; }
```
