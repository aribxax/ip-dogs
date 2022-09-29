
/*                               _____                    _____                    _____          
                                /\    \                  /\    \                  /\    \         
                               /::\    \                /::\    \                /::\    \        
                              /::::\    \              /::::\    \               \:::\    \       
                             /::::::\    \            /::::::\    \               \:::\    \      
                            /:::/\:::\    \          /:::/\:::\    \               \:::\    \     
                           /:::/__\:::\    \        /:::/__\:::\    \               \:::\    \    
                          /::::\   \:::\    \      /::::\   \:::\    \              /::::\    \   
                         /::::::\   \:::\    \    /::::::\   \:::\    \    ____    /::::::\    \  
                        /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\  /\   \  /:::/\:::\    \ 
                       /:::/  \:::\   \:::\____\/:::/  \:::\   \:::|    |/::\   \/:::/  \:::\____\
                       \::/    \:::\  /:::/    /\::/    \:::\  /:::|____|\:::\  /:::/    \::/    /
                        \/____/ \:::\/:::/    /  \/_____/\:::\/:::/    /  \:::\/:::/    / \/____/ 
                                 \::::::/    /            \::::::/    /    \::::::/    /          
                                  \::::/    /              \::::/    /      \::::/____/           
                                  /:::/    /                \::/____/        \:::\    \           
                                 /:::/    /                  ~~               \:::\    \          
                                /:::/    /                                     \:::\    \         
                               /:::/    /                                       \:::\____\        
                               \::/    /                                         \::/    /        
                                \/____/                                           \/____/         
                                                                                              */     
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { createTemperamentBulk } = require('./src/controllers/temperamentController');

createTemperamentBulk();
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('///--------------------------------LETS GO ᕦ(ò_óˇ)ᕤ 3001'); // eslint-disable-line no-console
  });
});