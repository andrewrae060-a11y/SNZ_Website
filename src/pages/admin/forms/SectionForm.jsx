import {
  CheckboxField,
  NumberField,
  SelectField,
  TagsField,
  TextAreaField,
  TextField,
} from "../components/FormFields";

import MediaPicker from "../components/MediaPicker";
import RichTextEditor from "../components/RichTextEditor";

function update(value, onChange, field, nextValue) {
  onChange({
    ...value,
    [field]: nextValue,
  });
}

const HERO_SOURCE_SECTIONS = [
  {
    value: "custom",
    label: "Create a custom Hero card",
  },
  {
    value: "channelPosts",
    label: "Select from Social Posts",
  },
  {
    value: "editorPicks",
    label: "Select from Editor’s Picks",
  },
  {
    value: "partnerContent",
    label: "Select from Partner Content",
  },
  {
    value: "events",
    label: "Select from Events",
  },
];

function unwrapContentItems(content, sectionKey) {
  const sectionItems = Array.isArray(content?.[sectionKey])
    ? content[sectionKey]
    : [];

  return sectionItems.map((item, index) => ({
    id:
      item?.id ??
      item?.itemKey ??
      item?.item_key ??
      item?.key ??
      index,
    itemKey:
      item?.itemKey ??
      item?.item_key ??
      item?.key ??
      "",
    section: item?.section || sectionKey,
    status: item?.status || "draft",
    sortOrder:
      item?.sortOrder ??
      item?.sort_order ??
      index,
    data:
      item?.data && typeof item.data === "object"
        ? item.data
        : item,
  }));
}

function getSourceItemId(item) {
  return String(
    item?.id ||
      item?.itemKey ||
      item?.data?.title ||
      ""
  );
}

function getSourceTitle(item) {
  const data = item?.data || {};

  return (
    data.title ||
    data.name ||
    data.partner ||
    data.heading ||
    item?.itemKey ||
    "Untitled item"
  );
}

function getSourceType(sectionKey, item) {
  const data = item?.data || {};

  if (sectionKey === "channelPosts") {
    return data.channel || "Social post";
  }

  if (sectionKey === "editorPicks") {
    return data.type || "Editor’s Pick";
  }

  if (sectionKey === "partnerContent") {
    return data.type || data.partner || "Partner content";
  }

  if (sectionKey === "events") {
    return data.type || "Event";
  }

  return data.type || "Article";
}

function getSourceCta(sectionKey, item) {
  const data = item?.data || {};

  if (sectionKey === "channelPosts") {
    return data.cta || "View post";
  }

  if (sectionKey === "events") {
    return data.action || data.cta || "Learn more";
  }

  return data.cta || "Read more";
}

function getSourceImage(item) {
  const data = item?.data || {};

  return data.image || data.heroImage || "";
}

function getSourceImageAlt(item) {
  const data = item?.data || {};

  return (
    data.imageAlt ||
    data.heroImageAlt ||
    data.title ||
    ""
  );
}

function applyHeroSource(
  value,
  onChange,
  content,
  sourceSection,
  sourceId
) {
  const sourceItems = unwrapContentItems(
    content,
    sourceSection
  );

  const sourceItem = sourceItems.find(
    (item) =>
      getSourceItemId(item) === String(sourceId)
  );

  if (!sourceItem) {
    onChange({
      ...value,
      heroSourceSection: sourceSection,
      heroSourceId: "",
      sourceItemKey: "",
    });

    return;
  }

  const data = sourceItem.data || {};

  onChange({
    ...value,
    heroSourceSection: sourceSection,
    heroSourceId: getSourceItemId(sourceItem),
    sourceItemKey: sourceItem.itemKey || "",
    type: getSourceType(sourceSection, sourceItem),
    title: getSourceTitle(sourceItem),
    cta: getSourceCta(sourceSection, sourceItem),
    url: data.url || "",
    image: getSourceImage(sourceItem),
    imageAlt: getSourceImageAlt(sourceItem),
    mediaType: data.mediaType || "image",
  });
}

function SeoFields({ value, onChange }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.14em] text-slate-700">
        Optional SEO and social sharing fields
      </summary>

      <div className="mt-5 grid gap-5">
        <TextField
          label="Meta title"
          value={value.seoTitle || ""}
          onChange={(nextValue) =>
            update(value, onChange, "seoTitle", nextValue)
          }
          maxLength={70}
          placeholder="Recommended: 50–60 characters"
          helpText="Used as the search engine and browser title where this content has its own page."
        />

        <TextAreaField
          label="Meta description"
          value={value.seoDescription || ""}
          onChange={(nextValue) =>
            update(
              value,
              onChange,
              "seoDescription",
              nextValue
            )
          }
          rows={3}
          maxLength={170}
          placeholder="Recommended: 140–160 characters"
          helpText="Used as the search result summary where this content has its own page."
        />

        <TextField
          label="SEO keywords"
          value={value.seoKeywords || ""}
          onChange={(nextValue) =>
            update(
              value,
              onChange,
              "seoKeywords",
              nextValue
            )
          }
          placeholder="smart infrastructure, net zero, building compliance"
          helpText="Optional. Use a small number of relevant phrases, separated by commas."
        />

        <TextField
          label="Canonical URL"
          type="url"
          value={value.canonicalUrl || ""}
          onChange={(nextValue) =>
            update(
              value,
              onChange,
              "canonicalUrl",
              nextValue
            )
          }
          placeholder="https://www.smartnetzero.co.uk/..."
          helpText="Optional. Use when this content has a preferred public URL."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <TextField
            label="Open Graph title"
            value={value.ogTitle || ""}
            onChange={(nextValue) =>
              update(value, onChange, "ogTitle", nextValue)
            }
            placeholder="Social sharing title"
          />

          <TextField
            label="Open Graph image URL"
            type="url"
            value={value.ogImage || ""}
            onChange={(nextValue) =>
              update(value, onChange, "ogImage", nextValue)
            }
            placeholder="https://..."
            helpText="Optional. If blank, the item image can be used."
          />
        </div>

        <TextAreaField
          label="Open Graph description"
          value={value.ogDescription || ""}
          onChange={(nextValue) =>
            update(
              value,
              onChange,
              "ogDescription",
              nextValue
            )
          }
          rows={3}
          maxLength={220}
          placeholder="Social sharing description"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Robots"
            value={value.robots || "index,follow"}
            onChange={(nextValue) =>
              update(value, onChange, "robots", nextValue)
            }
            options={[
              {
                value: "index,follow",
                label: "Index and follow",
              },
              {
                value: "index,nofollow",
                label: "Index but do not follow links",
              },
              {
                value: "noindex,follow",
                label: "Do not index but follow links",
              },
              {
                value: "noindex,nofollow",
                label: "Do not index and do not follow",
              },
            ]}
          />

          <SelectField
            label="Structured data type"
            value={
              value.structuredDataType || "WebPage"
            }
            onChange={(nextValue) =>
              update(
                value,
                onChange,
                "structuredDataType",
                nextValue
              )
            }
            options={[
              {
                value: "WebPage",
                label: "WebPage",
              },
              {
                value: "Article",
                label: "Article",
              },
              {
                value: "NewsArticle",
                label: "NewsArticle",
              },
              {
                value: "Event",
                label: "Event",
              },
              {
                value: "VideoObject",
                label: "VideoObject",
              },
              {
                value: "SocialMediaPosting",
                label: "SocialMediaPosting",
              },
              {
                value: "Organization",
                label: "Organization",
              },
            ]}
          />
        </div>
      </div>
    </details>
  );
}

function PageSettingsForm({
  value,
  onChange,
  onUploadMedia,
}) {
  return (
    <div className="grid gap-5">
      <TextField
        label="Section label"
        value={value.eyebrow}
        onChange={(nextValue) =>
          update(value, onChange, "eyebrow", nextValue)
        }
      />

      <TextField
        label="Main heading — first line"
        value={value.headingLineOne}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "headingLineOne",
            nextValue
          )
        }
        required
      />

      <TextField
        label="Main heading — second line"
        value={value.headingLineTwo}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "headingLineTwo",
            nextValue
          )
        }
      />

      <TextAreaField
        label="Introduction"
        value={value.intro}
        onChange={(nextValue) =>
          update(value, onChange, "intro", nextValue)
        }
        required
        maxLength={600}
      />

      <TextField
        label="Social-media handle"
        value={value.socialHandle}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "socialHandle",
            nextValue
          )
        }
        placeholder="@smartnetzero"
      />

      <TextField
        label="Phone card text"
        value={value.phoneCardText}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "phoneCardText",
            nextValue
          )
        }
      />

      <MediaPicker
        label="Hero image"
        imagesOnly
        value={{
          image: value.heroImage || "",
          imageAlt: value.heroImageAlt || "",
          mediaType: "image",
          mediaId: value.heroMediaId || null,
        }}
        onChange={(media) =>
          onChange({
            ...value,
            heroImage: media.image || "",
            heroImageAlt: media.imageAlt || "",
            heroMediaId:
              media.mediaId || media.id || null,
          })
        }
        onUploadMedia={onUploadMedia}
      />

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function HeroCardForm({
  value,
  onChange,
  content,
}) {
  const sourceSection =
    value.heroSourceSection || "custom";

  const sourceItems =
    sourceSection === "custom"
      ? []
      : unwrapContentItems(content, sourceSection);

  const isCustom = sourceSection === "custom";

  return (
    <div className="grid gap-5">
      <SelectField
        label="Hero card source"
        value={sourceSection}
        onChange={(nextValue) => {
          if (nextValue === "custom") {
            onChange({
              ...value,
              heroSourceSection: "custom",
              heroSourceId: "",
              sourceItemKey: "",
            });

            return;
          }

          onChange({
            ...value,
            heroSourceSection: nextValue,
            heroSourceId: "",
            sourceItemKey: "",
          });
        }}
        options={HERO_SOURCE_SECTIONS}
      />

      {!isCustom && (
        <SelectField
          label="Select item to highlight"
          value={value.heroSourceId || ""}
          onChange={(nextValue) =>
            applyHeroSource(
              value,
              onChange,
              content,
              sourceSection,
              nextValue
            )
          }
          options={[
            {
              value: "",
              label: "Select an existing item",
            },
            ...sourceItems.map((item) => ({
              value: getSourceItemId(item),
              label: `${getSourceType(
                sourceSection,
                item
              )} — ${getSourceTitle(item)}`,
            })),
          ]}
        />
      )}

      {!isCustom && (
        <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4 text-sm leading-6 text-teal-900">
          This Hero card is linked to an existing CMS item.
          The title, type, image and destination are copied
          from the selected item and will also be resolved on
          the live page.
        </div>
      )}

      <TextField
        label="Content type"
        value={value.type}
        onChange={(nextValue) =>
          update(value, onChange, "type", nextValue)
        }
        placeholder="New research, case study or event"
        disabled={!isCustom}
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(value, onChange, "title", nextValue)
        }
        required
        disabled={!isCustom}
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(value, onChange, "cta", nextValue)
        }
        placeholder="Read more"
        disabled={!isCustom}
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(value, onChange, "url", nextValue)
        }
        placeholder="https://..."
        helpText={
          isCustom
            ? "Use this for a custom Hero card destination."
            : "This is taken from the selected item where available."
        }
        disabled={!isCustom}
      />

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function SocialPostForm({
  value,
  onChange,
  onUploadMedia,
}) {
  return (
    <div className="grid gap-5">
      <SelectField
        label="Social platform"
        value={value.channel || "LinkedIn"}
        onChange={(nextValue) =>
          update(value, onChange, "channel", nextValue)
        }
        options={[
          {
            value: "LinkedIn",
            label: "LinkedIn",
          },
          {
            value: "X",
            label: "X",
          },
          {
            value: "YouTube",
            label: "YouTube",
          },
          {
            value: "Instagram",
            label: "Instagram",
          },
        ]}
      />

      <TextAreaField
        label="Post text"
        value={value.title}
        onChange={(nextValue) =>
          update(value, onChange, "title", nextValue)
        }
        required
        maxLength={1000}
      />

      <TagsField
        label="Hashtags"
        value={value.tags || []}
        onChange={(nextValue) =>
          update(value, onChange, "tags", nextValue)
        }
      />

      <TextField
        label="Published label"
        value={value.publishedLabel || value.time || ""}
        onChange={(nextValue) =>
          onChange({
            ...value,
            publishedLabel: nextValue,
            time: nextValue,
          })
        }
        placeholder="Today, 3h ago or 18 June 2026"
      />

      <TextField
        label="Publication date"
        type="date"
        value={value.publishedAt || ""}
        onChange={(nextValue) =>
          update(value, onChange, "publishedAt", nextValue)
        }
        helpText="Used to order posts from latest to oldest."
      />

      <CheckboxField
        label="Spotlight"
        checked={value.spotlight}
        onChange={(nextValue) =>
          update(value, onChange, "spotlight", nextValue)
        }
        helpText="Only one social post or Editor’s Pick can be in the spotlight. It is shown first."
      />

      <MediaPicker
        label="Post image or video"
        value={value}
        onChange={onChange}
        onUploadMedia={onUploadMedia}
      />

      <TextField
        label="Social post URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(value, onChange, "url", nextValue)
        }
        placeholder="https://..."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Likes"
          value={value.likes}
          onChange={(nextValue) =>
            update(value, onChange, "likes", nextValue)
          }
        />

        <NumberField
          label="Comments"
          value={value.comments}
          onChange={(nextValue) =>
            update(
              value,
              onChange,
              "comments",
              nextValue
            )
          }
        />

        <NumberField
          label="Shares or views"
          value={value.shares}
          onChange={(nextValue) =>
            update(value, onChange, "shares", nextValue)
          }
        />
      </div>

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function EditorPickForm({
  value,
  onChange,
  onUploadMedia,
}) {
  const hasExternalUrl = Boolean(
    String(value.url || "").trim()
  );

  return (
    <div className="grid gap-5">
      <SelectField
        label="Content type"
        value={value.type || "Article"}
        onChange={(nextValue) =>
          onChange({
            ...value,
            type: nextValue,
            iconType: nextValue
              .toLowerCase()
              .replace(/\s+/g, "-"),
          })
        }
        options={[
          {
            value: "Article",
            label: "Article",
          },
          {
            value: "Case Study",
            label: "Case study",
          },
          {
            value: "Report",
            label: "Report",
          },
          {
            value: "Podcast",
            label: "Podcast",
          },
          {
            value: "Webinar",
            label: "Webinar",
          },
        ]}
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(value, onChange, "title", nextValue)
        }
        required
      />

      <TextField
        label="Publication date"
        type="date"
        value={value.publishedAt || ""}
        onChange={(nextValue) =>
          update(value, onChange, "publishedAt", nextValue)
        }
        helpText="Used to order articles from latest to oldest."
      />

      <CheckboxField
        label="Spotlight"
        checked={value.spotlight}
        onChange={(nextValue) =>
          update(value, onChange, "spotlight", nextValue)
        }
        helpText="Only one social post or Editor’s Pick can be in the spotlight. It is shown first."
      />

      <MediaPicker
        label="Card image"
        imagesOnly
        value={{
          ...value,
          mediaType: "image",
        }}
        onChange={onChange}
        onUploadMedia={onUploadMedia}
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(value, onChange, "cta", nextValue)
        }
        placeholder="Read article"
        helpText="This is the button text shown on the Editor’s Pick card."
      />

      <TextField
        label="External destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(value, onChange, "url", nextValue)
        }
        placeholder="https://..."
        helpText="If this is completed, the card will open this external page. If left blank, the card will open the internal story popup below."
      />

      {!hasExternalUrl && (
        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            Internal story popup
          </p>

          <h3 className="mt-1 text-lg font-black text-slate-950">
            Further information content
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            No external URL has been entered, so this Editor’s
            Pick will open a popup window using the card image
            and the content below.
          </p>

          <div className="mt-5 grid gap-5">
            <TextField
              label="Popup eyebrow"
              value={value.detailEyebrow || ""}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "detailEyebrow",
                  nextValue
                )
              }
              placeholder="Insight, story, update or case study"
            />

            <TextField
              label="Popup heading"
              value={value.detailHeading || ""}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "detailHeading",
                  nextValue
                )
              }
              placeholder="Leave blank to use the card title"
              helpText="If left blank, the popup will use the Editor’s Pick title."
            />

            <TextAreaField
              label="Popup introduction"
              value={value.detailIntro || ""}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "detailIntro",
                  nextValue
                )
              }
              rows={4}
              maxLength={500}
              placeholder="Short opening summary for the popup."
            />

           <RichTextEditor
              label="Popup story detail"
              value={value.detailBody || ""}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "detailBody",
                  nextValue
                )
              }
              helpText="Use headings, bold text, lists, links and colours to structure the popup content."
            />

            <TextAreaField
              label="Optional pull quote or highlighted point"
              value={value.detailQuote || ""}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "detailQuote",
                  nextValue
                )
              }
              rows={3}
              maxLength={350}
              placeholder="Optional highlighted sentence."
            />

            <TextField
              label="Popup close button label"
              value={value.detailCtaLabel || "Close"}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "detailCtaLabel",
                  nextValue
                )
              }
              placeholder="Close"
            />
          </div>
        </div>
      )}

      {hasExternalUrl && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          This Editor’s Pick has an external URL, so the
          internal popup content is hidden and will not be
          used.
        </div>
      )}

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function PartnerContentForm({
  value,
  onChange,
  onUploadMedia,
}) {
  return (
    <div className="grid gap-5">
      <TextField
        label="Partner name"
        value={value.partner}
        onChange={(nextValue) =>
          update(value, onChange, "partner", nextValue)
        }
        required
      />

      <TextField
        label="Content type"
        value={value.type}
        onChange={(nextValue) =>
          update(value, onChange, "type", nextValue)
        }
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(value, onChange, "title", nextValue)
        }
        required
      />

      <MediaPicker
        label="Partner content image"
        imagesOnly
        value={{
          ...value,
          mediaType: "image",
        }}
        onChange={onChange}
        onUploadMedia={onUploadMedia}
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(value, onChange, "cta", nextValue)
        }
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(value, onChange, "url", nextValue)
        }
      />

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function EventForm({
  value,
  onChange,
  onUploadMedia,
}) {
  const registrationMode =
    value.registrationMode || "external";

  return (
    <div className="grid gap-5">
      <SelectField
        label="Event type"
        value={value.type || "Webinar"}
        onChange={(nextValue) =>
          update(value, onChange, "type", nextValue)
        }
        options={[
          {
            value: "Webinar",
            label: "Webinar",
          },
          {
            value: "Event",
            label: "Event",
          },
          {
            value: "Conference",
            label: "Conference",
          },
          {
            value: "Workshop",
            label: "Workshop",
          },
        ]}
      />

      <TextField
        label="Event title"
        value={value.title}
        onChange={(nextValue) =>
          update(value, onChange, "title", nextValue)
        }
        required
      />

      <TextField
        label="Event date"
        type="date"
        value={value.date}
        onChange={(nextValue) =>
          update(value, onChange, "date", nextValue)
        }
        required
      />

      <TextField
        label="Time or location"
        value={value.time}
        onChange={(nextValue) =>
          update(value, onChange, "time", nextValue)
        }
        placeholder="10:00 AM BST or London, UK"
      />

      <MediaPicker
        label="Event image"
        imagesOnly
        value={{
          ...value,
          mediaType: "image",
        }}
        onChange={onChange}
        onUploadMedia={onUploadMedia}
      />

      <TextField
        label="Button text"
        value={value.action || value.cta || ""}
        onChange={(nextValue) =>
          onChange({
            ...value,
            action: nextValue,
            cta: nextValue,
          })
        }
      />

      <SelectField
        label="Registration method"
        value={registrationMode}
        onChange={(nextValue) =>
          onChange({
            ...value,
            registrationMode: nextValue,
            url:
              nextValue === "internal"
                ? ""
                : value.url || "",
          })
        }
        options={[
          {
            value: "external",
            label: "External registration URL",
          },
          {
            value: "internal",
            label: "Website registration form",
          },
        ]}
      />

      {registrationMode === "external" ? (
        <TextField
          label="Registration URL"
          type="url"
          value={value.url}
          onChange={(nextValue) =>
            update(value, onChange, "url", nextValue)
          }
          placeholder="https://eventbrite..."
          helpText="Use this for Eventbrite, Teams, Zoom, LinkedIn or another external registration page."
        />
      ) : (
        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">
            Website registration form
          </p>

          <h3 className="mt-1 text-lg font-black text-slate-950">
            Internal event registration
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Visitors will complete a form on the website. The
            response will be emailed to the recipient below.
          </p>

          <div className="mt-5 grid gap-5">
            <TextField
              label="Notification recipient"
              type="email"
              value={
                value.registrationRecipient ||
                "michael.sweenie@smartnetzero.co.uk"
              }
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "registrationRecipient",
                  nextValue
                )
              }
              placeholder="michael.sweenie@smartnetzero.co.uk"
            />

            <TextAreaField
              label="Registration form intro"
              value={value.registrationIntro || ""}
              onChange={(nextValue) =>
                update(
                  value,
                  onChange,
                  "registrationIntro",
                  nextValue
                )
              }
              rows={3}
              maxLength={350}
              placeholder="Register your interest and a member of the Smart Net Zero team will contact you."
            />
          </div>
        </div>
      )}

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function QuickActionForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <SelectField
        label="Action type"
        value={value.actionType || "contribute"}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "actionType",
            nextValue
          )
        }
        options={[
          {
            value: "subscribe",
            label: "Subscribe",
          },
          {
            value: "follow",
            label: "Follow channels",
          },
          {
            value: "contribute",
            label: "Contribute story",
          },
          {
            value: "explore-partners",
            label: "Explore partners",
          },
          {
            value: "become-partner",
            label: "Become a partner",
          },
        ]}
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(value, onChange, "title", nextValue)
        }
        required
      />

      <TextAreaField
        label="Description"
        value={value.text || value.description || ""}
        onChange={(nextValue) =>
          onChange({
            ...value,
            text: nextValue,
            description: nextValue,
          })
        }
        maxLength={350}
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(value, onChange, "cta", nextValue)
        }
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(value, onChange, "url", nextValue)
        }
      />

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

function SocialChannelForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <SelectField
        label="Social channel"
        value={value.name || "LinkedIn"}
        onChange={(nextValue) =>
          update(value, onChange, "name", nextValue)
        }
        options={[
          {
            value: "LinkedIn",
            label: "LinkedIn",
          },
          {
            value: "X (Twitter)",
            label: "X (Twitter)",
          },
          {
            value: "YouTube",
            label: "YouTube",
          },
          {
            value: "Instagram",
            label: "Instagram",
          },
        ]}
      />

      <TextField
        label="Button text"
        value={value.action || "Follow"}
        onChange={(nextValue) =>
          update(value, onChange, "action", nextValue)
        }
      />

      <TextField
        label="Channel URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(value, onChange, "url", nextValue)
        }
        required
      />

      <SeoFields value={value} onChange={onChange} />
    </div>
  );
}

export default function SectionForm({
  section,
  value = {},
  onChange,
  content,
  onUploadMedia,
}) {
  switch (section) {
    case "page":
      return (
        <PageSettingsForm
          value={value}
          onChange={onChange}
          onUploadMedia={onUploadMedia}
        />
      );

    case "heroCards":
      return (
        <HeroCardForm
          value={value}
          onChange={onChange}
          content={content}
        />
      );

    case "channelPosts":
      return (
        <SocialPostForm
          value={value}
          onChange={onChange}
          onUploadMedia={onUploadMedia}
        />
      );

    case "editorPicks":
      return (
        <EditorPickForm
          value={value}
          onChange={onChange}
          onUploadMedia={onUploadMedia}
        />
      );

    case "partnerContent":
      return (
        <PartnerContentForm
          value={value}
          onChange={onChange}
          onUploadMedia={onUploadMedia}
        />
      );

    case "events":
      return (
        <EventForm
          value={value}
          onChange={onChange}
          onUploadMedia={onUploadMedia}
        />
      );

    case "quickActions":
      return (
        <QuickActionForm
          value={value}
          onChange={onChange}
        />
      );

    case "channels":
      return (
        <SocialChannelForm
          value={value}
          onChange={onChange}
        />
      );

    default:
      return (
        <div className="rounded-xl bg-amber-50 p-4 text-sm font-bold text-amber-800">
          This section does not yet have an editing form.
        </div>
      );
  }
}