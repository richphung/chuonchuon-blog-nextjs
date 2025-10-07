# Adding New Languages and Content

## ✅ **Good News: Process is Exactly the Same!**

The alternative solution **only changes routing** (client-side vs middleware). Everything else remains identical:

- ✅ Same file structure
- ✅ Same translation process
- ✅ Same content organization
- ✅ Same component usage

---

## 🌐 **Adding a New Language**

### Example: Adding Spanish (es)

#### Step 1: Update Configuration (5 minutes)

**File:** `i18n.ts`
```typescript
// Add 'es' to the locales array
export const locales = ['en', 'vi', 'es'] as const;  // ← Add here
export const defaultLocale = 'en' as const;
```

**File:** `src/app/page.tsx` (root redirector)
```typescript
// Update the supported locales
const supportedLocales = ['en', 'vi', 'es'];  // ← Add here
```

#### Step 2: Create Translation File (1 hour)

**File:** `messages/es.json`
```bash
# Copy the English template
cp messages/en.json messages/es.json

# Then translate all values to Spanish
```

**Example structure:**
```json
{
  "nav": {
    "home": "Inicio",        // ← Spanish translation
    "blog": "Blog",
    "about": "Acerca de",
    // ... etc
  }
}
```

#### Step 3: Create Content Directory (5 minutes)

```bash
# Create Spanish content folder
mkdir -p content/es/blog/posts
mkdir -p content/es/portfolio
mkdir -p content/es/services
mkdir -p content/es/about

# Copy structure from English
cp -r content/en/* content/es/
# Then translate the content files
```

#### Step 4: Test (10 minutes)

```bash
# Rebuild
npm run build

# Start
npm run dev

# Test URLs
http://localhost:3000/es           # Spanish homepage
http://localhost:3000/es/blog      # Spanish blog
http://localhost:3000/es/about     # Spanish about
```

**That's it!** The language switcher will automatically show "ES" button.

---

## 📝 **Adding New Content**

### Example: Adding a New Blog Post

The process is **identical for all languages**:

#### For English Content

**File:** `content/en/blog/posts/my-new-post.md`
```markdown
---
title: "My New Blog Post"
description: "This is a great post"
date: "2025-10-07"
category: "copywriting"
featured: true
---

# My New Blog Post

Content goes here...
```

#### For Vietnamese Content

**File:** `content/vi/blog/posts/my-new-post.md`
```markdown
---
title: "Bài viết mới của tôi"
description: "Đây là một bài viết tuyệt vời"
date: "2025-10-07"
category: "copywriting"
featured: true
---

# Bài viết mới của tôi

Nội dung ở đây...
```

**Important:** Use the **same filename** (`my-new-post.md`) in both languages!

---

## 🔄 **What Changed vs. What Didn't**

### ✅ Same as Before (No Changes)

| Aspect | How It Works |
|--------|--------------|
| **File Structure** | Still uses `[locale]` folders |
| **Translations** | Still in `messages/*.json` |
| **Content** | Still in `content/locale/` |
| **Components** | Still receive `locale` prop |
| **Translation Keys** | Still use `t('nav.home')` |
| **Content Functions** | Still use `getBlogPost(slug, locale)` |

### 🔄 What Changed (Routing Only)

| Before (Middleware) | After (Alternative) |
|---------------------|---------------------|
| Middleware rewrites URLs | Root page redirects |
| `/` → middleware → `/en` | `/` → client redirect → `/en` |
| Automatic locale detection in middleware | Locale detection in root page |

**User experience is identical!** They still see `/en/blog`, `/vi/blog`, etc.

---

## 📋 **Quick Reference: Adding Content**

### Adding a Blog Post

1. Create file: `content/{locale}/blog/posts/filename.md`
2. Add frontmatter (title, date, category, etc.)
3. Write content in Markdown
4. Repeat for each language
5. Done! It automatically appears

### Adding a Service

1. Create file: `content/{locale}/services/service-name.json`
2. Add service details:
```json
{
  "title": "Service Name",
  "description": "Service description",
  "features": ["Feature 1", "Feature 2"],
  "pricing": "$100"
}
```
3. Repeat for each language

### Adding a Portfolio Item

1. Create file: `content/{locale}/portfolio/project-name.json`
2. Add project details:
```json
{
  "title": "Project Name",
  "client": "Client Name",
  "description": "Project description",
  "results": "Project outcomes",
  "image": "/images/portfolio/project.jpg"
}
```
3. Repeat for each language

---

## 🌍 **Supported Languages Example**

After adding languages, your structure looks like:

```
content/
├── en/                    # English
│   ├── blog/
│   ├── portfolio/
│   └── services/
├── vi/                    # Vietnamese
│   ├── blog/
│   ├── portfolio/
│   └── services/
├── es/                    # Spanish (newly added)
│   ├── blog/
│   ├── portfolio/
│   └── services/
└── fr/                    # French (newly added)
    ├── blog/
    ├── portfolio/
    └── services/

messages/
├── en.json                # English UI translations
├── vi.json                # Vietnamese UI translations
├── es.json                # Spanish UI translations (new)
└── fr.json                # French UI translations (new)
```

---

## 🎨 **Language Switcher Automatically Updates**

The language switcher component automatically shows all languages defined in `i18n.ts`:

```typescript
// i18n.ts
export const locales = ['en', 'vi', 'es', 'fr'] as const;

// Language switcher automatically renders:
// [EN] [VI] [ES] [FR]
```

**No manual updates needed!**

---

## 🔧 **Advanced: Language-Specific Content**

### Content That Only Exists in One Language

**Q:** What if I have a blog post only in English, not in Vietnamese?

**A:** The content functions already handle this with fallback:

```typescript
// If Vietnamese post doesn't exist, falls back to English
const post = await getBlogPostBySlug('my-post', 'vi');
// Returns English version if Vietnamese doesn't exist
```

This is already implemented in `src/lib/content.ts`!

---

## 📝 **Translation Workflow**

### For Solo Developer

1. **Write content in English first**
   ```
   content/en/blog/posts/new-post.md
   ```

2. **Translate when ready**
   ```
   # Copy to other language
   cp content/en/blog/posts/new-post.md content/vi/blog/posts/new-post.md
   
   # Translate the content
   # Edit content/vi/blog/posts/new-post.md
   ```

3. **Test both languages**
   ```
   http://localhost:3000/en/blog/new-post
   http://localhost:3000/vi/blog/new-post
   ```

### For Team with Translators

1. **Developer creates English content**
2. **Export content for translation**
   ```bash
   # List untranslated files
   diff -r content/en/ content/vi/
   ```
3. **Translator translates**
4. **Add translated files**
5. **Review and publish**

---

## 🚀 **Complete Example: Adding German**

Here's the complete process:

### 1. Update `i18n.ts`
```typescript
export const locales = ['en', 'vi', 'de'] as const;
```

### 2. Update `src/app/page.tsx`
```typescript
const supportedLocales = ['en', 'vi', 'de'];
```

### 3. Create `messages/de.json`
```bash
cp messages/en.json messages/de.json
# Translate to German
```

### 4. Create content structure
```bash
mkdir -p content/de/{blog/posts,portfolio,services,about}
```

### 5. Add content
```bash
# Copy and translate
cp -r content/en/* content/de/
# Translate the files
```

### 6. Test
```bash
npm run build
npm run dev
# Visit http://localhost:3000/de
```

### 7. Done!
German is now fully supported with:
- ✅ German homepage: `/de`
- ✅ German blog: `/de/blog`
- ✅ German about: `/de/about`
- ✅ Language switcher shows [EN] [VI] [DE]

---

## ✅ **Summary**

### Adding a New Language

1. Add to `locales` array in `i18n.ts` and `src/app/page.tsx`
2. Create `messages/{lang}.json` with translations
3. Create `content/{lang}/` directory structure
4. Rebuild and test

**Time:** ~2-3 hours (including translations)

### Adding New Content

1. Create content file in `content/{locale}/`
2. Use same filename across languages
3. Translate content
4. Done! Automatically available

**Time:** ~30 minutes per piece of content per language

---

## 🎯 **No Changes Needed**

The alternative solution **does not change**:
- ❌ File structure
- ❌ Translation format
- ❌ Content organization
- ❌ Component usage
- ❌ Adding languages process
- ❌ Adding content process

**Only routing mechanism changed (internal implementation)**

---

**Questions?** See `NEW_LANGUAGE_TEMPLATE.md` for detailed templates and examples.

*Last Updated: 2025-10-07*
