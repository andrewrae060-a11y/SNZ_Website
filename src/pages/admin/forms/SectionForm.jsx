import {
  NumberField,
  SelectField,
  TagsField,
  TextAreaField,
  TextField,
} from "../components/FormFields";

import MediaPicker from "../components/MediaPicker";

function update(
  value,
  onChange,
  field,
  nextValue
) {
  onChange({
    ...value,
    [field]: nextValue,
  });
}

function PageSettingsForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <TextField
        label="Section label"
        value={value.eyebrow}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "eyebrow",
            nextValue
          )
        }
      />

      <TextField
        label="Main heading — first line"
        value={
          value.headingLineOne
        }
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
        value={
          value.headingLineTwo
        }
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
          update(
            value,
            onChange,
            "intro",
            nextValue
          )
        }
        required
        maxLength={600}
      />

      <TextField
        label="Social-media handle"
        value={
          value.socialHandle
        }
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
        value={
          value.phoneCardText
        }
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
          image:
            value.heroImage ||
            "",
          imageAlt:
            value.heroImageAlt ||
            "",
          mediaType: "image",
          mediaId:
            value.heroMediaId ||
            null,
        }}
        onChange={(media) =>
          onChange({
            ...value,
            heroImage:
              media.image || "",
            heroImageAlt:
              media.imageAlt || "",
            heroMediaId:
              media.mediaId ||
              null,
          })
        }
      />
    </div>
  );
}

function HeroCardForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <TextField
        label="Content type"
        value={value.type}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "type",
            nextValue
          )
        }
        placeholder="New research, case study or event"
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "title",
            nextValue
          )
        }
        required
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "cta",
            nextValue
          )
        }
        placeholder="Read more"
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
        placeholder="https://..."
      />
    </div>
  );
}

function SocialPostForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <SelectField
        label="Social platform"
        value={
          value.channel ||
          "LinkedIn"
        }
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "channel",
            nextValue
          )
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
          update(
            value,
            onChange,
            "title",
            nextValue
          )
        }
        required
        maxLength={1000}
      />

      <TagsField
        label="Hashtags"
        value={value.tags || []}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "tags",
            nextValue
          )
        }
      />

      <TextField
        label="Published label"
        value={
          value.publishedLabel ||
          value.time ||
          ""
        }
        onChange={(nextValue) =>
          onChange({
            ...value,
            publishedLabel:
              nextValue,
            time: nextValue,
          })
        }
        placeholder="Today, 3h ago or 18 June 2026"
      />

      <MediaPicker
        label="Post image or video"
        value={value}
        onChange={onChange}
      />

      <TextField
        label="Social post URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
        placeholder="https://..."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Likes"
          value={value.likes}
          onChange={(nextValue) =>
            update(
              value,
              onChange,
              "likes",
              nextValue
            )
          }
        />

        <NumberField
          label="Comments"
          value={
            value.comments
          }
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
            update(
              value,
              onChange,
              "shares",
              nextValue
            )
          }
        />
      </div>
    </div>
  );
}

function EditorPickForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <SelectField
        label="Content type"
        value={
          value.type ||
          "Article"
        }
        onChange={(nextValue) =>
          onChange({
            ...value,
            type: nextValue,
            iconType:
              nextValue
                .toLowerCase()
                .replace(
                  /\s+/g,
                  "-"
                ),
          })
        }
        options={[
          {
            value: "Article",
            label: "Article",
          },
          {
            value:
              "Case Study",
            label:
              "Case study",
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
          update(
            value,
            onChange,
            "title",
            nextValue
          )
        }
        required
      />

      <MediaPicker
        label="Card image"
        imagesOnly
        value={{
          ...value,
          mediaType: "image",
        }}
        onChange={onChange}
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "cta",
            nextValue
          )
        }
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
      />
    </div>
  );
}

function PartnerContentForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <TextField
        label="Partner name"
        value={value.partner}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "partner",
            nextValue
          )
        }
        required
      />

      <TextField
        label="Content type"
        value={value.type}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "type",
            nextValue
          )
        }
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "title",
            nextValue
          )
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
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "cta",
            nextValue
          )
        }
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
      />
    </div>
  );
}

function EventForm({
  value,
  onChange,
}) {
  return (
    <div className="grid gap-5">
      <SelectField
        label="Event type"
        value={
          value.type ||
          "Webinar"
        }
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "type",
            nextValue
          )
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
            value:
              "Conference",
            label:
              "Conference",
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
          update(
            value,
            onChange,
            "title",
            nextValue
          )
        }
        required
      />

      <TextField
        label="Event date"
        type="date"
        value={value.date}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "date",
            nextValue
          )
        }
        required
      />

      <TextField
        label="Time or location"
        value={value.time}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "time",
            nextValue
          )
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
      />

      <TextField
        label="Button text"
        value={
          value.action ||
          value.cta ||
          ""
        }
        onChange={(nextValue) =>
          onChange({
            ...value,
            action: nextValue,
            cta: nextValue,
          })
        }
      />

      <TextField
        label="Registration URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
      />
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
        value={
          value.actionType ||
          "contribute"
        }
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
            label:
              "Follow channels",
          },
          {
            value: "contribute",
            label:
              "Contribute story",
          },
          {
            value:
              "explore-partners",
            label:
              "Explore partners",
          },
          {
            value:
              "become-partner",
            label:
              "Become a partner",
          },
        ]}
      />

      <TextField
        label="Title"
        value={value.title}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "title",
            nextValue
          )
        }
        required
      />

      <TextAreaField
        label="Description"
        value={
          value.text ||
          value.description ||
          ""
        }
        onChange={(nextValue) =>
          onChange({
            ...value,
            text: nextValue,
            description:
              nextValue,
          })
        }
        maxLength={350}
      />

      <TextField
        label="Button text"
        value={value.cta}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "cta",
            nextValue
          )
        }
      />

      <TextField
        label="Destination URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
      />
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
        value={
          value.name ||
          "LinkedIn"
        }
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "name",
            nextValue
          )
        }
        options={[
          {
            value: "LinkedIn",
            label: "LinkedIn",
          },
          {
            value:
              "X (Twitter)",
            label:
              "X (Twitter)",
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
        value={
          value.action ||
          "Follow"
        }
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "action",
            nextValue
          )
        }
      />

      <TextField
        label="Channel URL"
        type="url"
        value={value.url}
        onChange={(nextValue) =>
          update(
            value,
            onChange,
            "url",
            nextValue
          )
        }
        required
      />
    </div>
  );
}

export default function SectionForm({
  section,
  value = {},
  onChange,
}) {
  switch (section) {
    case "page":
      return (
        <PageSettingsForm
          value={value}
          onChange={onChange}
        />
      );

    case "heroCards":
      return (
        <HeroCardForm
          value={value}
          onChange={onChange}
        />
      );

    case "channelPosts":
      return (
        <SocialPostForm
          value={value}
          onChange={onChange}
        />
      );

    case "editorPicks":
      return (
        <EditorPickForm
          value={value}
          onChange={onChange}
        />
      );

    case "partnerContent":
      return (
        <PartnerContentForm
          value={value}
          onChange={onChange}
        />
      );

    case "events":
      return (
        <EventForm
          value={value}
          onChange={onChange}
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
          This section does not
          yet have an editing form.
        </div>
      );
  }
}