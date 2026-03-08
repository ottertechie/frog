# Memory System

## Layer 1: Active thread
Current chat only. Cleared on persona switch and New Conversation.

## Layer 2: Private persona summary
Each persona stores rolling summary context in `persona_memory`.

## Layer 3: Filtered cross-persona summaries
Short summaries from one persona to others via `shared_summaries`.

## Update timing
- On persona switch, old persona messages are summarized and saved.
- On explicit conversation save, current persona summary refreshes.

## Not shared by design
- Raw full thread is not copied to other personas.
- Shared context is short and filtered.
