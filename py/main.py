import discord
from discord.ext import commands
from config import TOKEN

bot = commands.Bot(command_prefix='!', intents=discord.Intents.all())

@bot.command()
async def modmail(ctx, *, message: str):
    mod_channel = discord.utils.get(ctx.guild.channels, name='modmail')
    if not mod_channel:
        return await ctx.send('i was unable to find the modmail channel')

    await mod_channel.send(f'{ctx.author}: {message}')
    await ctx.send('message has been sent to the mods')

bot.run(TOKEN)
