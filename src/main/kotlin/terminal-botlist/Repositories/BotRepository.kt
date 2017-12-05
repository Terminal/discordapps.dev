package `terminal-botlist`.Repositories.BotRepository

import `terminal-botlist`.Entities.Bot
import org.springframework.data.repository.CrudRepository

interface BotRepository : CrudRepository<Bot, Long> {

}
