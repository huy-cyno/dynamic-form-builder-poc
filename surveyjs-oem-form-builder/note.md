# SurveyJS Form Builder - OEM vs Public Edition

**Date:** November 12, 2025
**Status:** Research & Documentation
**Conclusion:** Using Public Free Edition for POC Development

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [SurveyJS Form Builder Options](#surveyjs-form-builder-options)
3. [OEM Form Builder (Commercial)](#oem-form-builder-commercial)
4. [Public Free Form Builder](#public-free-form-builder)
5. [Feature Comparison](#feature-comparison)
6. [Why We're Using the Public Version](#why-were-using-the-public-version)
7. [Accessing the Free Form Builder](#accessing-the-free-form-builder)
8. [Limitations & Considerations](#limitations--considerations)
9. [Integration Strategies](#integration-strategies)
10. [Future Migration Path](#future-migration-path)

---

## Executive Summary

**The SurveyJS Form Builder that we created in `custom-form-builder-poc/` is our own open-source implementation.**

However, SurveyJS offers two form builder solutions:

| Edition | Cost | License | Use Case | POC Status |
|---------|------|---------|----------|-----------|
| **OEM Form Builder** | 💰 Paid | Commercial License | Enterprise production | ❌ Not used |
| **Public Free Form Builder** | 🆓 Free | Public Access | Testing & POC | ✅ **Recommended** |
| **Custom Builder (Ours)** | 🆓 Open-source | MIT-like | Development & POC | ✅ **Created** |

---

## SurveyJS Form Builder Options

### What is SurveyJS?

**SurveyJS** is a comprehensive form and survey library from IronSoftware:
- Official website: https://surveyjs.io/
- Provides JSON-based form/survey creation
- Supports multiple frameworks (React, Angular, Vue, etc.)
- Enterprise-grade form solutions

### The SurveyJS Ecosystem

```
SurveyJS Library Suite:
│
├─ survey-core
│  └─ Core form model and logic
│
├─ survey-react-ui / survey-angular-ui / survey-vue-ui
│  └─ Framework-specific rendering
│
├─ SurveyJS Designer (Form Builder) - COMMERCIAL 💰
│  └─ OEM - requires paid license
│
└─ SurveyJS Free Online Tool
   └─ Public web-based form builder (FREE!)
      Available at: https://surveyjs.io/create-free-survey
```

---

## OEM Form Builder (Commercial)

### What is the OEM Form Builder?

The **OEM (Original Equipment Manufacturer) Form Builder** is SurveyJS's professional form builder:
- Drag-and-drop interface
- Real-time form preview
- JSON export/import
- Professional UI
- Advanced field customization
- Multi-language support
- Full SurveyJS integration

### Pricing & Licensing

```
OEM Form Builder License:

📌 Licensing Model: Commercial - requires purchase

💵 Cost Structure:
   - Per-developer license
   - Team license
   - Enterprise license
   - Custom pricing available

📄 License Terms:
   - Requires commercial agreement
   - Cannot be used free for POC
   - Requires registration & credentials
   - Not available in open-source form

🔗 More info: https://surveyjs.io/form-builder/overview
```

### Why We're NOT Using OEM Form Builder

❌ **Reasons:**
- Requires paid license (not available for POC testing)
- No free trial for integrated OEM version
- Commercial licensing terms for production use
- Requires business agreement with IronSoftware
- Not suitable for open-source POC demonstration

---

## Public Free Form Builder

### What is the Free Form Builder?

SurveyJS provides a **completely free, public web-based form builder** at:

## 🔗 **https://surveyjs.io/create-free-survey**

### Key Characteristics

```
✅ Completely Free - No cost, no registration required
✅ No Code Needed - Web-based browser interface
✅ Real-time Preview - See form as you build
✅ Export JSON - Download form as JSON file
✅ Import JSON - Load existing forms
✅ Same Engine - Uses exact SurveyJS technology
✅ Professional UI - Polished user interface
✅ Full Features - All standard form features
✅ No Watermark - Clean forms without branding
✅ No Licensing - Free for any use (personal, commercial, POC)
```

### Official Description

From SurveyJS documentation:
> "Create free surveys and forms online with our free survey maker. No coding required. Create, customize, and deploy your forms instantly."

---

## Feature Comparison

### OEM Form Builder vs Public Free Builder

| Feature | OEM Builder | Free Builder | Custom Builder (Ours) |
|---------|-------------|--------------|----------------------|
| **Cost** | 💰 Paid | 🆓 Free | 🆓 Open-source |
| **Web Interface** | ✅ Yes | ✅ Yes | ✅ Yes (custom) |
| **Drag-Drop** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Field Types** | ✅ 10+ types | ✅ Standard types | ✅ 7 types |
| **JSON Export** | ✅ Yes | ✅ Yes | ✅ Yes |
| **JSON Import** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Preview** | ✅ Real-time | ✅ Real-time | ✅ Real-time |
| **Multi-language** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Validation** | ✅ Advanced | ✅ Basic | ✅ Basic |
| **Licensing** | ❌ Restricted | ✅ Free | ✅ Free |
| **Framework Integration** | ✅ Direct | ⚠️ Export/Import | ✅ Direct |
| **Source Code** | ❌ Closed | ❌ Closed | ✅ Open-source |
| **Customization** | ⚠️ Limited | ❌ Limited | ✅ Full |
| **Deployment** | ⚠️ Enterprise | ✅ Anywhere | ✅ Anywhere |

---

## Why We're Using the Public Version

### For POC & Testing Purposes

✅ **Best Choice Because:**

1. **100% Free**
   - No licensing costs
   - No registration required
   - No trial limitations
   - No commercial agreements needed

2. **Same Technology**
   - Uses exact SurveyJS technology
   - Identical form output
   - Compatible JSON format
   - Same field types and features

3. **Tested in Production**
   - Used by thousands globally
   - Reliability proven
   - Regular updates
   - Official SurveyJS support

4. **Perfect for POC**
   - Quick form creation
   - No setup required
   - Immediate results
   - No implementation overhead

5. **Easy Integration**
   - Export JSON directly
   - Import into our POC applications
   - Test rendering across all frameworks
   - Verify cross-platform compatibility

6. **No Legal Issues**
   - Completely free to use
   - No licensing restrictions
   - Can use for commercial testing
   - No agreements required

---

## Accessing the Free Form Builder

### Step-by-Step Guide

#### **Option 1: Using SurveyJS Free Builder (Recommended)**

```
1. Open Browser
   → Go to: https://surveyjs.io/create-free-survey

2. Create New Form
   → Click "New Survey" or "Start Building"

3. Add Fields
   → Drag field types from palette
   → Configure each field (title, options, etc.)
   → Add translations if needed

4. Preview Form
   → Click Preview button
   → See real-time rendering

5. Export Form
   → Click Export/Download
   → Save as JSON file
   → Copy JSON content

6. Use in POC Apps
   → Angular POC: Add to form registry, copy JSON to public/
   → React POC: Add to form registry, copy JSON to public/
   → Builder POC: Import and edit in custom builder
```

#### **Option 2: Using Our Custom Builder (Alternative)**

```
1. Start Custom Builder
   cd custom-form-builder-poc
   npm run dev

2. Create Form in UI
   → Drag fields from palette
   → Set properties (titles, options)
   → Add translations
   → Preview in real-time

3. Export JSON
   → Click "Download Form"
   → JSON file downloads to computer

4. Use in Renderer Apps
   → Copy JSON to renderer public folders
   → Update form registries
   → Test rendering
```

---

## Limitations & Considerations

### Free Form Builder Limitations

```
⚠️ Known Limitations:

1. Feature Set
   └─ May not have ALL SurveyJS Pro features
      └─ But has all standard features needed

2. Customization
   └─ UI limited to standard options
      └─ For advanced customization, export JSON and modify

3. Analytics
   └─ No built-in analytics
      └─ Implement in renderer app instead

4. Storage
   └─ Forms not stored in their cloud
      └─ Must download/backup yourself

5. Support
   └─ Community support only (no paid support)
      └─ Sufficient for POC development
```

### Workarounds

```
Problem: Need to store forms?
Solution: Download JSON and store locally

Problem: Need analytics?
Solution: Implement in renderer apps

Problem: Need advanced features?
Solution: Modify exported JSON programmatically

Problem: Need multiple versions?
Solution: Save multiple JSON files with version numbers

Problem: Need to share forms?
Solution: Share JSON files or export/import links
```

---

## Integration Strategies

### Strategy 1: SurveyJS Free Builder → Our POC Apps

**Workflow:**
```
SurveyJS Free Builder          Our POC Applications
(https://surveyjs.io/...)  →   (React/Angular/Custom)
   ↓ Export JSON                ↓
   ↓ Copy JSON                  ↓
   ↓ Save to file               ↓
   └─────────→ public/sample-forms/
               ├── form.json (used by all 3)
               └─ Rendered by all renderers
```

**Steps:**
1. Build form in SurveyJS free builder
2. Export as JSON
3. Copy JSON to `public/sample-forms/form-name.json`
4. Add entry to form service registry
5. Restart dev servers
6. Verify rendering in all three apps

### Strategy 2: Custom Builder → SurveyJS Compatibility Testing

**Workflow:**
```
Our Custom Builder          SurveyJS Compatibility Check
(custom-form-builder-poc)
   ↓ Create form
   ↓ Export JSON
   └──→ Test in renderers
        Test in SurveyJS preview
        Verify JSON validity
```

**Steps:**
1. Create form in custom builder
2. Export JSON
3. Test in our renderer apps
4. Verify can be imported into SurveyJS free builder
5. Confirms compatibility

### Strategy 3: Hybrid Approach (Recommended)

**For Maximum Flexibility:**

```
1. Create form in SurveyJS free builder
   └─ Quick prototyping
   └─ UI-driven design
   └─ Export JSON

2. Import into custom builder
   └─ Further customization if needed
   └─ Add special logic
   └─ Modify structure

3. Test in all renderer apps
   └─ React POC
   └─ Angular POC
   └─ Verify rendering

4. Deploy forms
   └─ Add to form registries
   └─ Make available in all apps
```

---

## Feature Walkthrough: SurveyJS Free Builder

### Available Field Types

```
Standard Fields:
  ✅ Text Input
  ✅ Dropdown/Select
  ✅ Radio Buttons
  ✅ Checkboxes
  ✅ Textarea
  ✅ Date Picker
  ✅ Number Input
  ✅ Email Input
  ✅ Password Input

Advanced Fields:
  ✅ Rating Scale
  ✅ Ranking
  ✅ Matrix (table)
  ✅ Multi-select
  ✅ Dynamic lists
  ✅ Signature
  ✅ Image picker
```

### Form Customization Options

```
✅ Form Title & Description
✅ Field-level customization
✅ Validation rules
✅ Required field marking
✅ Default values
✅ Placeholder text
✅ Help text / tooltips
✅ Multi-page support (Page breaks)
✅ Conditional logic
✅ Progress indicator
✅ Navigation buttons
✅ Submit button text
```

### JSON Output Format

```json
{
  "title": "My Form",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "field1",
          "title": "Field Title",
          "isRequired": true
        }
      ]
    }
  ]
}
```

---

## Future Migration Path

### If Upgrading to Commercial Solution

**Should your project need commercial features:**

```
Current State: Using Free SurveyJS Builder
         ↓
         ↓ (If project grows)
         ↓
Upgrade Option 1: SurveyJS OEM Builder
  ├─ Contact: https://surveyjs.io/contact
  ├─ Licensing: Enterprise agreement
  ├─ Cost: Custom quote
  └─ Benefit: Full integration, support

Upgrade Option 2: Keep Custom Builder + Premium Features
  ├─ Extend custom-form-builder-poc
  ├─ Add advanced features
  ├─ Maintain open-source
  └─ Full control over functionality

Upgrade Option 3: Hybrid Approach
  ├─ Use OEM for enterprise clients
  ├─ Use free builder for public/SMB
  ├─ Use custom builder for unique needs
  └─ Flexible, adaptable solution
```

---

## Conclusion

### Our Decision Summary

```
❌ OEM Form Builder
   └─ Paid license required
   └─ Not suitable for open-source POC

✅ Public Free Form Builder
   └─ Same technology as OEM
   └─ Completely free
   └─ No licensing restrictions
   └─ Perfect for POC testing

✅ Custom Form Builder (Ours)
   └─ Open-source implementation
   └─ Full control
   └─ Learning opportunity
   └─ Can be extended
```

### Recommended Workflow

```
For Form Creation:
1. Quick prototyping → Use SurveyJS Free Builder
2. Complex customization → Use Custom Builder
3. Testing forms → Use either, test in all renderers

For Integration:
1. Export JSON from builder
2. Add to form registry
3. Copy JSON to public folder
4. Verify in all three POCs
```

---

## Resources & Links

### Official SurveyJS Resources

| Resource | Link | Purpose |
|----------|------|---------|
| **Free Form Builder** | https://surveyjs.io/create-free-survey | Create & test forms |
| **SurveyJS Docs** | https://surveyjs.io/documentation | Reference & guides |
| **API Reference** | https://surveyjs.io/documentation/survey-core/ | Technical docs |
| **GitHub** | https://github.com/surveyjs/survey-library | Open-source code |
| **Contact/Licensing** | https://surveyjs.io/contact | Commercial inquiries |

### Our Custom Builder

| Resource | Location | Purpose |
|----------|----------|---------|
| **Custom Builder** | `custom-form-builder-poc/` | Our implementation |
| **README** | `custom-form-builder-poc/README.md` | Setup guide |
| **Source** | `custom-form-builder-poc/src/` | Full code |

### Our Renderer Apps

| App | Location | Purpose |
|-----|----------|---------|
| **Angular POC** | `surveyjs-angular-poc/` | Render in Angular |
| **React POC** | `surveyjs-react-poc/` | Render in React |
| **Form Sample** | `public/sample-forms/` | Test JSON files |

---

## FAQ

### Q: Can we use the free builder for commercial projects?
**A:** Yes, there are no licensing restrictions on the free builder.

### Q: Is the free builder the same as the OEM builder?
**A:** It uses the same SurveyJS technology, though may have slight UI differences.

### Q: Can we modify the JSON from the free builder?
**A:** Yes, JSON is open format. You can edit it programmatically.

### Q: How do we keep forms in sync across POCs?
**A:** Store JSON files in git, reference from all apps' public folders.

### Q: What if the free builder goes offline?
**A:** We have the custom builder as backup, can create forms there.

### Q: Can we host our own form builder?
**A:** Yes, using our custom builder or self-hosting SurveyJS.

### Q: Does the free builder have an API?
**A:** No API, but export/import JSON files for integration.

### Q: Can we embed the free builder in our app?
**A:** Not directly, but can use custom builder or iframe.

---

## Next Steps

### To Use This Approach

1. **Test Free Builder**
   - Visit https://surveyjs.io/create-free-survey
   - Create a sample form
   - Export the JSON

2. **Test in Our POCs**
   - Add form to registries
   - Copy JSON to public folders
   - Verify rendering in all three apps

3. **Document Forms**
   - Store JSON in git
   - Create form library
   - Version forms

4. **Iterate**
   - Gather feedback
   - Update forms
   - Test changes
   - Validate across frameworks

---

## Summary Table

| Aspect | Free Builder | OEM Builder | Custom Builder |
|--------|--------------|-------------|-----------------|
| **Cost** | 🆓 Free | 💰 Paid | 🆓 Open |
| **Setup** | 5 min | Days | Hours |
| **Learning Curve** | Easy | Medium | Medium |
| **POC Suitable** | ✅ YES | ⚠️ With cost | ✅ YES |
| **JSON Export** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Customizable** | ⚠️ Limited | ✅ Full | ✅ Full |
| **Recommendation** | ✅ First choice | Enterprise only | Development |

---

**Status:** Ready for POC Development
**Approved:** Using SurveyJS Free Builder for Testing
**Date:** November 12, 2025
