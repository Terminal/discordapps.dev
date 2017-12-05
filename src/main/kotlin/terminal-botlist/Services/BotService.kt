package `terminal-botlist`.Services

import `terminal-botlist`.Repositories.BotRepository.BotRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class BotService(private val repository: BotRepository) {

    @GetMapping("/bots")
    fun findAll() = repository.findAll()

    @GetMapping("/bots/{id}")
    fun findById(@PathVariable id: Long)
            = repository.findById(id)
}