# Current Page Layout

## Full Page Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│                          HEADER                                     │
│  ┌────────────────────────┐      ┌─────────────────────────────┐  │
│  │ Logo + Title + Subtitle │      │ Font | Theme | Language     │  │
│  └────────────────────────┘      └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      MODE SELECTOR (Centered)                        │
│              [ Transform Mode ]  [ Compare Mode ]                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    ACTION BAR (Control Center)                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ FORMAT ▼    │ │ CONVERTERS ▼ │ │ ENCODING ▼  │ │ STRING ▼    │ │
│  │ [Format]    │ │ [TypeScript] │ │ [Encode]    │ │ [Escape]    │ │
│  │ [Compress]  │ │ [GraphQL]    │ │ [Decode]    │ │ [Unescape]  │ │
│  │ [Sort]      │ │ [Protobuf]   │ │             │ │             │ │
│  │ [Repair]    │ │ [YAML]       │ │             │ │             │ │
│  │             │ │ [XML]        │ │             │ │             │ │
│  │             │ │ [CSV]        │ │             │ │             │ │
│  │             │ │ [Query]      │ │             │ │             │ │
│  │             │ │ [Tabular]    │ │             │ │             │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│  ┌─────────────┐                                                    │
│  │ NESTED ▼    │                                                    │
│  │ [Flatten]   │                                                    │
│  │ [Unflatten] │                                                    │
│  └─────────────┘                                                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         MAIN CONTENT                                │
│                                                                     │
│  ┌──────────────────┐              ┌──────────────────┐          │
│  │                  │              │                  │          │
│  │  SOURCE PANEL   │              │  RESULT PANEL    │          │
│  │                 │              │                  │          │
│  │  ┌────────────┐ │              │  ┌────────────┐ │          │
│  │  │ Line #    │ │              │  │ Line #    │ │          │
│  │  │ 1         │ │              │  │ 1         │ │          │
│  │  │ 2         │ │              │  │ 2         │ │          │
│  │  │ 3         │ │              │  │ 3         │ │          │
│  │  │ ...       │ │              │  │ ...       │ │          │
│  │  └────────────┘ │              │  └────────────┘ │          │
│  │  ┌────────────┐ │              │  ┌────────────┐ │          │
│  │  │ Textarea   │ │              │  │ Textarea   │ │          │
│  │  │ (editable) │ │              │  │ (readonly) │ │          │
│  │  │            │ │              │  │            │ │          │
│  │  └────────────┘ │              │  └────────────┘ │          │
│  │                  │              │                  │          │
│  │  [Stats] [Summary]│              │  [Stats] [Summary]│          │
│  └──────────────────┘              └──────────────────┘          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        AD CONTAINER                                 │
│                         [Advertisement]                             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                           FOOTER                                    │
│        "Built with precision • Open Source • Privacy First"         │
│                        [Buy Me A Coffee]                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Transform Mode Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ACTION BAR (Horizontal)                            │
│  [FORMAT ▼] [CONVERTERS ▼] [ENCODING ▼] [STRING ▼] [NESTED ▼]      │
│  [Format] [Compress] [Sort] [Repair] | [TS] [GQL] [PB] [YAML] ...  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  SOURCE PANEL                        │  RESULT PANEL                │
├──────────────────────────────────────┼─────────────────────────────┤
│  Header:                              │  Header:                    │
│  [Source] [Paste][URL][...]           │  [Result] [Copy][Fullscreen]│
├──────────────────────────────────────┼─────────────────────────────┤
│  ┌────┐ ┌──────────────────────────┐ │ ┌────┐ ┌──────────────────┐│
│  │ 1  │ │                          │ │ │ 1  │ │                  ││
│  │ 2  │ │                          │ │ │ 2  │ │                  ││
│  │ 3  │ │      Textarea            │ │ │ 3  │ │    Output        ││
│  │ 4  │ │      (editable)          │ │ │ 4  │ │                  ││
│  │ 5  │ │                          │ │ │ 5  │ │                  ││
│  │... │ │                          │ │ │... │ │                  ││
│  └────┘ └──────────────────────────┘ │ └────┘ └──────────────────┘│
├──────────────────────────────────────┼─────────────────────────────┤
│  Stats | Data Summary                 │  Stats | Summary           │
└──────────────────────────────────────┴─────────────────────────────┘
```

---

## Compare Mode Layout (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│  JSON A PANEL          │  CENTER ACTIONS  │  JSON B PANEL          │
├────────────────────────┼──────────────────┼───────────────────────┤
│  Header:                │                  │  Header:               │
│  [JSON A] [Paste][Clear]│                  │  [JSON B] [Paste][...] │
├────────────────────────┤                  ├───────────────────────┤
│  ┌────┐ ┌────────────┐ │  ┌────────────┐ │ ┌────┐ ┌────────────┐│
│  │ 1  │ │            │ │  │            │ │ │ 1  │ │            ││
│  │ 2  │ │  Textarea  │ │  │ [Compare]  │ │ │ 2  │ │  Textarea  ││
│  │ 3  │ │            │ │  │            │ │ │ 3  │ │            ││
│  │ 4  │ │            │ │  │ [Swap]     │ │ │ 4  │ │            ││
│  │... │ │            │ │  │            │ │ │... │ │            ││
│  └────┘ └────────────┘ │  └────────────┘ │ └────┘ └────────────┘│
└────────────────────────┴──────────────────┴───────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DIFF SUMMARY STRIP (appears after comparison)                       │
│  [0 differences] [0 added] [0 removed] [0 modified]                │
│  [◄ Prev] [1/5] [Next ►] [Toggle Details ▼]                         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│  DIFF DETAILS PANEL (collapsible)                                   │
│  [Difference Details] [Copy] [Close]                                │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Path: user.name                                               │  │
│  │ - "John"                                                      │  │
│  │ + "Jane"                                                      │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout (< 768px)

```
┌─────────────────────────────┐
│        HEADER               │
│  ┌───────────────────────┐ │
│  │   Logo + Title        │ │
│  │   Subtitle            │ │
│  └───────────────────────┘ │
│  ┌───────────────────────┐ │
│  │ [Font][Theme][Lang]   │ │
│  └───────────────────────┘ │
└─────────────────────────────┘

┌─────────────────────────────┐
│   MODE SELECTOR             │
│   [⚡] [⇄]                  │
└─────────────────────────────┘

┌─────────────────────────────┐
│   SOURCE PANEL              │
│   [Source] [Paste][...]      │
│   ┌────┐ ┌────────────────┐ │
│   │ 1  │ │                │ │
│   │ 2  │ │   Textarea     │ │
│   │ 3  │ │                │ │
│   └────┘ └────────────────┘ │
│   Stats | Summary           │
└─────────────────────────────┘

┌─────────────────────────────┐
│   CONTROL CENTER            │
│   ┌───────────────────────┐ │
│   │ FORMAT ▼              │ │
│   │ [⚡][🗜️][📊][🔧]      │ │
│   └───────────────────────┘ │
│   ┌───────────────────────┐ │
│   │ CONVERTERS ▼          │ │
│   │ [TS][GQL][PB][YML]    │ │
│   │ [XML][CSV][?][📋]     │ │
│   └───────────────────────┘ │
└─────────────────────────────┘

┌─────────────────────────────┐
│   RESULT PANEL              │
│   [Result] [Copy][...]      │
│   ┌────┐ ┌────────────────┐ │
│   │ 1  │ │                │ │
│   │ 2  │ │   Output       │ │
│   │ 3  │ │                │ │
│   └────┘ └────────────────┘ │
│   Stats | Summary           │
└─────────────────────────────┘

┌─────────────────────────────┐
│   AD CONTAINER              │
└─────────────────────────────┘

┌─────────────────────────────┐
│   FOOTER                    │
│   Text + [Coffee Button]    │
└─────────────────────────────┘
```

---

## Panel Structure Detail

### Source/Result Panel Internal Structure

```
┌─────────────────────────────────────┐
│  Header                             │
│  [Title + Icon] [Action Buttons]    │
├─────────────────────────────────────┤
│  ┌──────┐ ┌──────────────────────┐ │
│  │ Line │ │                      │ │
│  │ Num  │ │      Textarea        │ │
│  │      │ │      (grows with     │ │
│  │  1   │ │       content)       │ │
│  │  2   │ │                      │ │
│  │  3   │ │                      │ │
│  │ ...  │ │                      │ │
│  └──────┘ └──────────────────────┘ │
├─────────────────────────────────────┤
│  Footer                             │
│  [Stats] [Data Summary Toggle]      │
├─────────────────────────────────────┤
│  Data Summary (collapsible)          │
│  [Type counts] [Max depth] [Keys]   │
└─────────────────────────────────────┘
```

---

## Component Breakdown

### Header
- **Left**: Logo (36px) + Title + Subtitle
- **Right**: Font Size Toggle | Theme Toggle | Language Selector

### Mode Selector
- Centered container
- Two buttons: Transform | Compare

### Transform Mode
- **Action Bar** (below Mode Selector)
  - Horizontal layout with collapsible button groups
  - Groups: Format, Converters, Encoding, String, Nested/Flat
- **2-column grid** (desktop)
  - Column 1: Source Panel (flex: 1)
  - Column 2: Result Panel (flex: 1)

### Compare Mode
- **3-column grid** (desktop)
  - Column 1: JSON A Panel (flex: 1)
  - Column 2: Center Actions (min-width: 100px)
  - Column 3: JSON B Panel (flex: 1)
- Diff Summary Strip (full width, below panels)
- Diff Details Panel (full width, collapsible)

### Control Center (Action Bar)
- Horizontal layout with collapsible button groups
- Each group: Label (collapsible) + Buttons
- Positioned below Mode Selector, above panels
- Groups arranged horizontally, can wrap on smaller screens

---

## Responsive Breakpoints

### Desktop (> 1200px)
- Action bar: Horizontal layout below Mode Selector
- Panels: 2-column grid (Source | Result)
- Button groups in action bar can wrap if needed

### Tablet (768px - 1200px)
- Action bar: Horizontal layout, groups may wrap
- Single column layout for panels
- Panels stack vertically

### Mobile (< 768px)
- Single column layout
- Everything stacks vertically
- Icons-only buttons
- Compact spacing

