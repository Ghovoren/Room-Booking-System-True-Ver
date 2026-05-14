
export default function PromotionCard({ promotion, room, setPromotions }) {

    async function handleRemovePromotion() {
        try {
            const response = await fetch(`http://localhost:3000/rooms/${room.room_no}/promotions/${promotion.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Failed to remove promotion')
            }
            setPromotions(prev => prev.filter(p => p.id !== promotion.id))
        } catch (error) {
            console.error('Error removing promotion:', error)
        }
    }

    return (
        <div className="promotion-card">
            <h3>{promotion.id}: {promotion.name}</h3>
            <p>Discount: {promotion.discount}%</p>
            <button onClick={handleRemovePromotion}>Remove Promotion</button>
        </div>
    )
}
