package `terminal-botlist`.Entities

import javax.persistence.Entity

@Entity
data class Bot(
        val username: String,
        val id: Long
)