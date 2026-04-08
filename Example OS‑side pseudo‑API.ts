// Register module
registerCreatureModule("heptaverse.story_fox", {
  onInit(ctx) {
    ctx.log("Story Fox online: Archivist of the Heptaverse.");
  },

  onUserEvent(event, ctx) {
    // Route to tails by intent
    switch (event.type) {
      case "bedtime_mode":
        return ctx.tails["tail.story"].invoke(event, ctx);
      case "emotion_event":
        return ctx.tails["tail.comfort"].invoke(event, ctx);
      case "lore_query":
        return ctx.tails["tail.myth"].invoke(event, ctx);
      case "guardian_story":
        return ctx.tails["tail.guardian_adventure"].invoke(event, ctx);
      default:
        return ctx.tails["tail.story"].invoke(event, ctx);
    }
  },

  tails: {
    "tail.story": {
      invoke(event, ctx) {
        return ctx.replySafeStory({
          source: "guardian_archive",
          tone: "gentle",
          length: "short"
        });
      }
    },
    "tail.comfort": {
      invoke(event, ctx) {
        return ctx.replyComfort({
          emotion: event.emotion,
          includeBreathingPrompt: true
        });
      }
    },
    "tail.myth": {
      invoke(event, ctx) {
        return ctx.replyMythicLore({
          topic: event.topic,
          kidSafe: true
        });
      }
    },
    "tail.guardian_adventure": {
      invoke(event, ctx) {
        return ctx.replyAdventure({
          guardianId: "rocket.guardian",
          kidSafe: true
        });
      }
    }
    // ...implement other tails similarly
  }
});
