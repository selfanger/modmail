import org.javacord.api.DiscordApi;
import org.javacord.api.DiscordApiBuilder;
import org.javacord.api.event.message.MessageCreateEvent;

public class ModmailBot {
    public static void main(String[] args) {
        String token = "YOUR_BOT_TOKEN_HERE";

        DiscordApi api = new DiscordApiBuilder().setToken(token).login().join();

        api.addMessageCreateListener(event -> {
            if (event.getMessageContent().startsWith("!modmail")) {
                String message = event.getMessageContent().substring(8).trim();
                var modChannel = event.getServer().flatMap(server -> server.getChannelByName("modmail"));

                if (modChannel.isPresent()) {
                    modChannel.get().sendMessage(event.getMessageAuthor().getDisplayName() + ": " + message);
                    event.getChannel().sendMessage("Ymessage has been sent to the mods");
                } else {
                    event.getChannel().sendMessage("unable to find the modmail channel");
                }
            }
        });
    }
}
