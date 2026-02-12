// ByteQuest - Trade Network UI
// UI for Merchant Liselle's trade contracts

const TradeUI = {
  /**
   * Open the trade network interface
   */
  open() {
    if (!this._checkAvailability()) return;

    const content = this._renderMainView();
    if (typeof showModal === 'function') {
      showModal('trade-network-modal', content);
    }
  },

  /**
   * Check if trade network is available
   */
  _checkAvailability() {
    if (typeof tradeNetworkManager === 'undefined' || !tradeNetworkManager) {
      console.warn('[TradeUI] Trade network not initialized');
      if (typeof showNotification === 'function') {
        showNotification('Trade network not available', 'error');
      }
      return false;
    }

    if (!tradeNetworkManager.isAvailable()) {
      if (typeof showNotification === 'function') {
        showNotification('Trade network only available in Lurenium', 'warning');
      }
      return false;
    }

    return true;
  },

  /**
   * Render the main trade view
   */
  _renderMainView() {
    const rankInfo = tradeNetworkManager.getRankInfo();
    const stats = tradeNetworkManager.getTradeStats();
    const activeContracts = tradeNetworkManager.getActiveContracts();
    const availableContracts = tradeNetworkManager.getAvailableContracts();

    // Rank progress bar
    let progressBar = '';
    if (!rankInfo.isMaxRank) {
      const progress = (rankInfo.contractsCompleted / (rankInfo.contractsCompleted + rankInfo.contractsToNext)) * 100;
      progressBar = `
        <div class="trade-rank-progress">
          <div class="trade-rank-bar" style="width: ${progress}%"></div>
        </div>
        <div class="trade-rank-next">${rankInfo.contractsToNext} more contracts to ${rankInfo.nextRankName}</div>
      `;
    } else {
      progressBar = '<div class="trade-rank-max">Maximum Rank Achieved!</div>';
    }

    // Active contracts section
    let activeSection = '';
    if (activeContracts.length > 0) {
      const activeCards = activeContracts.map(c => this._renderContractCard(c, 'active')).join('');
      activeSection = `
        <div class="trade-section">
          <h3 class="trade-section-title">Active Contracts (${activeContracts.length})</h3>
          <div class="trade-contract-list">
            ${activeCards}
          </div>
        </div>
      `;
    }

    // Available contracts section
    let availableSection = '';
    if (availableContracts.length > 0) {
      const availableCards = availableContracts.map(c => this._renderContractCard(c, 'available')).join('');
      availableSection = `
        <div class="trade-section">
          <h3 class="trade-section-title">Available Contracts</h3>
          <div class="trade-contract-list">
            ${availableCards}
          </div>
        </div>
      `;
    } else {
      availableSection = `
        <div class="trade-section">
          <div class="trade-no-contracts">No contracts available. Check back later or increase your rank.</div>
        </div>
      `;
    }

    return `
      <div class="trade-network-ui">
        <div class="trade-header">
          <div class="trade-npc">
            <span class="trade-npc-icon">💰</span>
            <div class="trade-npc-info">
              <span class="trade-npc-name">Merchant Liselle</span>
              <span class="trade-npc-role">Trade Master</span>
            </div>
          </div>
          <button class="modal-close-btn" onclick="hideModal('trade-network-modal')">&times;</button>
        </div>

        <div class="trade-rank-display">
          <div class="trade-rank-current">
            <span class="trade-rank-icon">${rankInfo.icon}</span>
            <span class="trade-rank-name">${rankInfo.name}</span>
          </div>
          ${progressBar}
          <div class="trade-stats">
            <span class="trade-stat">Contracts: ${stats.contractsCompleted}</span>
            <span class="trade-stat">Rep: ${stats.merchantRep}</span>
          </div>
        </div>

        <div class="trade-dialogue">
          "${activeContracts.length > 0 ? 'You have contracts in progress. Bring me the goods when ready.' : 'Looking for work? I have contracts that need fulfilling.'}"
        </div>

        ${activeSection}
        ${availableSection}

        <div class="trade-actions">
          <button class="art-btn" onclick="hideModal('trade-network-modal')">Goodbye</button>
        </div>
      </div>
    `;
  },

  /**
   * Render a contract card
   */
  _renderContractCard(contract, status) {
    const progress = tradeNetworkManager.getContractProgress(contract.id);
    const canFulfill = progress?.isComplete || false;

    // Requirements display
    const reqsHtml = contract.requirements.map(req => {
      const owned = tradeNetworkManager._getItemCount(req.itemId);
      const itemName = tradeNetworkManager._getItemName(req.itemId);
      const complete = owned >= req.amount;
      return `
        <div class="trade-req ${complete ? 'complete' : ''}">
          <span class="trade-req-name">${itemName}</span>
          <span class="trade-req-count">${owned}/${req.amount}</span>
        </div>
      `;
    }).join('');

    // Rewards display
    let rewardsHtml = '';
    if (contract.rewards.gold) {
      rewardsHtml += `<span class="trade-reward reward-gold">+${contract.rewards.gold} Gold</span>`;
    }
    if (contract.rewards.merchantRep) {
      rewardsHtml += `<span class="trade-reward reward-rep">+${contract.rewards.merchantRep} Rep</span>`;
    }

    // Tier badge
    const tierBadge = `<span class="trade-tier tier-${contract.tier}">Tier ${contract.tier}</span>`;

    // Action buttons based on status
    let actionsHtml = '';
    if (status === 'available') {
      actionsHtml = `
        <button class="art-btn art-btn-sm" onclick="TradeUI.acceptContract('${contract.id}')">Accept</button>
      `;
    } else if (status === 'active') {
      actionsHtml = `
        <button class="art-btn art-btn-sm ${canFulfill ? 'art-btn-success' : ''}"
                onclick="TradeUI.fulfillContract('${contract.id}')"
                ${canFulfill ? '' : 'disabled'}>
          ${canFulfill ? 'Deliver' : 'Gathering...'}
        </button>
        <button class="art-btn art-btn-sm art-btn-secondary" onclick="TradeUI.abandonContract('${contract.id}')">Abandon</button>
      `;
    }

    return `
      <div class="trade-contract-card ${status} ${canFulfill ? 'ready' : ''}">
        <div class="trade-contract-header">
          <span class="trade-contract-icon">${contract.icon}</span>
          <div class="trade-contract-info">
            <div class="trade-contract-title">${contract.name}</div>
            <div class="trade-contract-desc">${contract.description}</div>
          </div>
          ${tierBadge}
        </div>

        <div class="trade-contract-requirements">
          <div class="trade-req-label">Required:</div>
          ${reqsHtml}
        </div>

        <div class="trade-contract-footer">
          <div class="trade-contract-rewards">${rewardsHtml}</div>
          <div class="trade-contract-actions">${actionsHtml}</div>
        </div>
      </div>
    `;
  },

  /**
   * Accept a contract
   */
  acceptContract(contractId) {
    const result = tradeNetworkManager.acceptContract(contractId);

    if (result.success) {
      if (typeof showNotification === 'function') {
        showNotification(`Contract accepted: ${result.contract.name}`, 'success');
      }
      // Refresh UI
      this.refresh();
    } else {
      if (typeof showNotification === 'function') {
        showNotification(result.error, 'error');
      }
    }
  },

  /**
   * Fulfill/deliver a contract
   */
  fulfillContract(contractId) {
    const result = tradeNetworkManager.fulfillContract(contractId);

    if (result.success) {
      // Show rewards notification
      let rewardText = '';
      if (result.rewards.gold) rewardText += `+${result.rewards.gold} Gold `;
      if (result.rewards.merchantRep) rewardText += `+${result.rewards.merchantRep} Rep`;

      if (typeof showNotification === 'function') {
        showNotification(`Contract complete! ${rewardText}`, 'success');
      }

      // Check for rank up
      if (result.rankedUp) {
        setTimeout(() => {
          this._showRankUpModal(result.newRank);
        }, 500);
      }

      // Refresh UI
      this.refresh();
    } else {
      if (typeof showNotification === 'function') {
        showNotification(result.error, 'error');
      }
    }
  },

  /**
   * Abandon a contract
   */
  abandonContract(contractId) {
    const result = tradeNetworkManager.abandonContract(contractId);

    if (result.success) {
      if (typeof showNotification === 'function') {
        showNotification('Contract abandoned', 'info');
      }
      this.refresh();
    }
  },

  /**
   * Show rank up celebration modal
   */
  _showRankUpModal(rankInfo) {
    const content = `
      <div class="trade-rankup-modal">
        <div class="trade-rankup-icon">${rankInfo.icon}</div>
        <h2 class="trade-rankup-title">Rank Up!</h2>
        <p class="trade-rankup-text">You've reached the rank of <strong>${rankInfo.name}</strong>!</p>
        <p class="trade-rankup-desc">New contracts are now available.</p>
        <button class="art-btn" onclick="hideModal('trade-rankup-modal'); TradeUI.refresh();">Continue</button>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('trade-rankup-modal', content);
    }
  },

  /**
   * Refresh the trade UI
   */
  refresh() {
    const modal = document.getElementById('trade-network-modal');
    if (modal && modal.style.display !== 'none') {
      const content = this._renderMainView();
      const modalContent = modal.querySelector('.modal-content');
      if (modalContent) {
        modalContent.innerHTML = content;
      }
    }
  },

  /**
   * View contract details
   */
  viewContract(contractId) {
    const contract = TRADE_CONTRACTS[contractId];
    if (!contract) return;

    const progress = tradeNetworkManager.getContractProgress(contractId);
    const isActive = tradeNetworkManager.getActiveContracts().some(c => c.id === contractId);

    // Build requirements detail
    const reqsDetail = contract.requirements.map(req => {
      const owned = tradeNetworkManager._getItemCount(req.itemId);
      const itemName = tradeNetworkManager._getItemName(req.itemId);
      return `
        <div class="trade-detail-req">
          <span>${itemName}</span>
          <span>${owned} / ${req.amount}</span>
        </div>
      `;
    }).join('');

    const content = `
      <div class="trade-contract-detail">
        <div class="trade-detail-header">
          <span class="trade-detail-icon">${contract.icon}</span>
          <h2 class="trade-detail-title">${contract.name}</h2>
        </div>

        <p class="trade-detail-desc">${contract.description}</p>

        <div class="trade-detail-dialogue">
          "${contract.dialogue.offer}"
        </div>

        <div class="trade-detail-section">
          <h3>Requirements</h3>
          ${reqsDetail}
        </div>

        <div class="trade-detail-section">
          <h3>Rewards</h3>
          <div class="trade-detail-rewards">
            ${contract.rewards.gold ? `<span>+${contract.rewards.gold} Gold</span>` : ''}
            ${contract.rewards.merchantRep ? `<span>+${contract.rewards.merchantRep} Rep</span>` : ''}
          </div>
        </div>

        <div class="trade-detail-actions">
          ${isActive
            ? `<button class="art-btn" onclick="TradeUI.fulfillContract('${contractId}')">Deliver</button>`
            : `<button class="art-btn" onclick="TradeUI.acceptContract('${contractId}')">Accept Contract</button>`
          }
          <button class="art-btn art-btn-secondary" onclick="TradeUI.open()">Back</button>
        </div>
      </div>
    `;

    if (typeof showModal === 'function') {
      showModal('trade-network-modal', content);
    }
  }
};

// =====================================================
// Global function to open trade UI from NPC interaction
// =====================================================

function openTradeNetwork() {
  TradeUI.open();
}

// =====================================================
// Exports
// =====================================================

window.TradeUI = TradeUI;
window.openTradeNetwork = openTradeNetwork;

console.log('[tradeUI.js] Trade UI loaded');
