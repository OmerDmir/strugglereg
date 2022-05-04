const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('839273281163886612'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG



//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     STG
function emoji_members(size){
  return size
  .replace(/0/g, `${client.emojis.cache.get("834132937317548052")}`) // 0 emojisi idsini 
  .replace(/1/g, `${client.emojis.cache.get("803648600806129676")}`) // 1 emojisi idsini yaz
  .replace(/2/g, `${client.emojis.cache.get("803648660633681961")}`) // 2 emojisi idsini yaz
  .replace(/3/g, `${client.emojis.cache.get("803648660168376362")}`) // 3 emojisi idsini yaz
  .replace(/4/g, `${client.emojis.cache.get("803648647036141628")}`) // 4 emojisi idsini yaz
  .replace(/5/g, `${client.emojis.cache.get("803648660172439583")}`) // 5 emojisi idsini yaz
  .replace(/6/g, `${client.emojis.cache.get("803648662319398923")}`) // 6 emojisi idsini yaz
  .replace(/7/g, `${client.emojis.cache.get("803648661157576724")}`) // 7 emojisi idsini yaz
  .replace(/8/g, `${client.emojis.cache.get("803648660410990632")}`) // 8 emojisi idsini yaz
  .replace(/9/g, `${client.emojis.cache.get("803648660637745162")}`) // 9 emojisi idsini yaz
}
client.on("guildMemberAdd", member => {
    require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`,
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
      const kanal = member.guild.channels.cache.find(r => r.id === "838915961964068885");//mesaj atılcak kanal id
      let register = '839286236756574260'
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = '** Hesap Durumu:** Güvenilir Değil <a:carpi:838962900881244190>'
  if (kurulus > 1296000000) kontrol = '** Hesap Durumu:** Güvenilir Gözüküyor <a:onay:838962566465585173>'
    moment.locale("tr");
    kanal.send(`<a:sari_yildiz:838961152288620544> **> ❈ Sunucumuza Hoş Geldin** <@`+member.id+`> <a:sariot:800774007208804363>
    
    <a:kirmizi_yildiz:838961147783807006>** > ❈ Seninle birlikte `+üyesayısı+`  kişiye ulaştık !**

    <a:kirmizi_yildiz:838961147783807006>   ** > ❈ Kayıt edilmek için \`❈ The Strugglers\`  odalarına geçip <@&${register}> yetkililerine teyit 
	vermen yeterli !**
	  
    <a:kirmizi_yildiz:838961147783807006> **> ❈ Tagımızı (\`❈\`) alarak bize destek olabilirsin**
     
<a:kirmizi_yildiz:838961147783807006>** > ❈ Sunucu kurallarımız #rules kanalında belirtilmiştir.Kayıt olan herkes kuralları kabul etmiş sayılacaktır.** <a:reborn_tik:815912725682978886>
		
<a:beyaz_yildiz:838961123847307304>${kontrol}
 <a:beyaz_yildiz:838961123847307304> **Hesap Oluşturma Tarihi:** ${moment(member.user.createdAt).format("`DD MMMM YYYY, dddd (hh:mm)`")}
`)
  kanal.send(`<@&${register}>`)
});
//------------------------HOŞGELDİN-EMBEDLİ-----------------------\\     STG


//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "808009439084281876") 
     var rol = member.guild.roles.cache.get("839273281163886612") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get("839273281163886612") // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------ŞÜPHELİ-HESAP-----------------------\\     STG


//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('838896138715136000'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = "❈"; // Buraya Ekip Tag
  var ekipRolü = "839286238787797032"; // Buraya Ekip Rolünün ID
  var logKanali = "838914067874840647"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     STG    

client.on("guildMemberAdd", member => {
  let sunucuid = "838896138715136000"; //Buraya sunucunuzun IDsini yazın
  let tag = "❈"; //Buraya tagınızı yazın
  let rol = "839286238787797032"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
  let channel = client.guilds.cache.get(sunucuid).channels.cache.find(x => x.name == 'tag-alma'); //tagrol-log yerine kendi log kanalınızın ismini yazabilirsiniz
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('838914067874840647').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     STG    

 client.login(ayarlar.token)
 
 client.on("ready", () => {
  client.channels.cache.get("838915030317269002").join();
})
