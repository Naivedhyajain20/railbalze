import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AISuggestions = ({ suggestions, onAcceptSuggestion, onModifySuggestion, onRejectSuggestion }) => {
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'safe':
        return {
          bg: 'bg-railway-safe/10',
          border: 'border-railway-safe/20',
          text: 'text-railway-safe',
          icon: 'CheckCircle'
        };
      case 'risky':
        return {
          bg: 'bg-railway-caution/10',
          border: 'border-railway-caution/20',
          text: 'text-railway-caution',
          icon: 'AlertTriangle'
        };
      case 'conflict':
        return {
          bg: 'bg-railway-danger/10',
          border: 'border-railway-danger/20',
          text: 'text-railway-danger',
          icon: 'XCircle'
        };
      default:
        return {
          bg: 'bg-muted/50',
          border: 'border-border',
          text: 'text-muted-foreground',
          icon: 'Circle'
        };
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-railway-safe';
    if (confidence >= 70) return 'text-railway-caution';
    return 'text-railway-danger';
  };

  const handleAction = async (action, suggestionId) => {
    setActionLoading(`${action}-${suggestionId}`);
    
    try {
      switch (action) {
        case 'accept':
          await onAcceptSuggestion(suggestionId);
          break;
        case 'modify':
          await onModifySuggestion(suggestionId);
          break;
        case 'reject':
          await onRejectSuggestion(suggestionId);
          break;
      }
    } catch (error) {
      console.error(`Error ${action}ing suggestion:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Brain" size={20} />
          <span>AI Recommendations</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-railway-safe rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live Analysis</span>
        </div>
      </div>
      <div className="space-y-4">
        {suggestions?.map((suggestion) => {
          const colors = getSuggestionColor(suggestion?.type);
          const isExpanded = expandedSuggestion === suggestion?.id;
          
          return (
            <div
              key={suggestion?.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${colors?.bg} ${colors?.border}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <Icon name={colors?.icon} size={20} className={colors?.text} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-medium text-foreground">{suggestion?.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full bg-background/50 ${colors?.text}`}>
                        {suggestion?.type?.toUpperCase()}
                      </span>
                      <span className={`text-xs font-medium ${getConfidenceColor(suggestion?.confidence)}`}>
                        {suggestion?.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion?.description}</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                  onClick={() => setExpandedSuggestion(isExpanded ? null : suggestion?.id)}
                />
              </div>
              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Impact Analysis</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {suggestion?.impact?.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Icon name="ArrowRight" size={12} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Implementation</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={12} />
                          <span>Duration: {suggestion?.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Users" size={12} />
                          <span>Affected: {suggestion?.affectedTrains} trains</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="AlertCircle" size={12} />
                          <span>Risk Level: {suggestion?.riskLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {suggestion?.reasoning && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">AI Reasoning</h4>
                      <p className="text-sm text-muted-foreground bg-background/50 rounded p-3">
                        {suggestion?.reasoning}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Generated: {formatTimestamp(suggestion?.timestamp)}</span>
                    <span>Model: {suggestion?.model} v{suggestion?.version}</span>
                  </div>
                </div>
              )}
              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleAction('reject', suggestion?.id)}
                  loading={actionLoading === `reject-${suggestion?.id}`}
                  className="text-railway-danger border-railway-danger/20 hover:bg-railway-danger/10"
                >
                  Reject
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={() => handleAction('modify', suggestion?.id)}
                  loading={actionLoading === `modify-${suggestion?.id}`}
                >
                  Modify
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleAction('accept', suggestion?.id)}
                  loading={actionLoading === `accept-${suggestion?.id}`}
                  className="bg-railway-safe hover:bg-railway-safe/90"
                >
                  Accept
                </Button>
              </div>
            </div>
          );
        })}

        {suggestions?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Brain" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Active Recommendations</h3>
            <p className="text-muted-foreground">
              AI is monitoring this train. Recommendations will appear when optimization opportunities are detected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;